/* Amplify Params - DO NOT EDIT
	API_DASHBOARD_GRAPHQLAPIENDPOINTOUTPUT
	API_DASHBOARD_GRAPHQLAPIIDOUTPUT
	API_DASHBOARD_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
	STORAGE_DASHBOARDS3_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { ConnectClient, CreateUserCommand } = require("@aws-sdk/client-connect");
const { sendAppSyncRequest } = require("./helpers/appSync.js");

const REGION = process.env.AWS_REGION;
const APPSYNCURL = process.env.API_DASHBOARD_GRAPHQLAPIENDPOINTOUTPUT;
const GQLAPIKEY = process.env.API_DASHBOARD_GRAPHQLAPIKEYOUTPUT;
const bucketName = process.env.STORAGE_DASHBOARDS3_BUCKETNAME;

const getS3file = async () => {
  const s3Client = new S3Client({ region: "us-east-1" });

  const objectKey = "WalmartEmployeeList.csv";

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  try {
    const response = await s3Client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString();

    const tuples = str.split("\n").map((line) => {
      const [email, role] = line.split(",");
      return [email.trim(), role.trim()];
    });

    return tuples;
  } catch (err) {
    console.error(err);
  }
};

/**
 @see https://docs.aws.amazon.com/connect/latest/APIReference/API_CreateUser.html
 **/
const createConnectUser = async (email, securityProfileId) => {
  const connectClient = new ConnectClient({ region: "us-east-1" });

  const inputConnect = {
    // CreateUserRequest
    Username: email, // required
    Password: "Welcome2024", // required
    PhoneConfig: {
      // UserPhoneConfig
      PhoneType: "SOFT_PHONE", // required
    },
    SecurityProfileIds: [
      // SecurityProfileIds
      securityProfileId, // required
    ],
    RoutingProfileId: "4eedec70-f00b-4398-b706-8acc23437010", // required
    InstanceId: "96cb63e2-25a1-4014-8f3c-e3919415d597", // required
    IdentityInfo: {
      // UserIdentityInfo
      Email: email, // required
      FirstName: "John", // required
      LastName: "Doe", // required
    },
  };

  const commandConnect = new CreateUserCommand(inputConnect);
  const responseConnect = await connectClient.send(commandConnect);

  return responseConnect;
};

async function createAppSyncUser(email, role) {
  const createUser = {
    query: `mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            role
            needsHelp
        }
      }`,
    variables: {
      input: {
        id: email,
        role: role,
        needsHelp: true,
      },
    },
  };

  const createUserRes = await sendAppSyncRequest(
    APPSYNCURL,
    REGION,
    "POST",
    createUser,
    GQLAPIKEY
  );

  if (!createUserRes.data[`createUser`]) {
    console.error(`Could not create contact with id ${id}`);
  }

  return createUserRes.data[`createUser`];
}

const findUserByEmail = (email, usersCsv) => {
  const user = usersCsv.find(([userEmail]) => userEmail === email);
  return user ? user : null;
};

exports.handler = async (event, context) => {
  const csv = await getS3file(event);

  const user = findUserByEmail(event.request.userAttributes.email, csv);

  if (user) {
    let securityProfileId =
      user[1] === "Agent"
        ? "b393134a-079a-42b5-b7ce-c23d1ab88b83"
        : "aeb2a576-2506-444a-9967-98891ba6e963";
    let userRole = user[1] === "Agent" ? "AGENT" : "SUPERVISOR"; // Enum: AGENT, SUPERVISOR

    try {
      const responseDynamoDB = await createAppSyncUser(
        event.request.userAttributes.email,
        userRole
      );
      console.log(responseDynamoDB);
    } catch (err) {
      console.error(err.message);
      if (err.message.includes("The conditional request failed")) {
        throw new Error("User already exists in the system.");
      } else {
        throw new Error("Something went wrong with the DB user creation.");
      }
    }

    try {
      const responseConnect = await createConnectUser(
        event.request.userAttributes.email,
        securityProfileId
      );
      console.log(responseConnect);
    } catch (err) {
      console.error(err); // keep going even if the connect user creation fails
    }

    return event;
  } else {
    console.error("User not found in the list.");
    throw new Error(
      "Something went wrong with the user creation. Please contact your administrator."
    );
  }
};
