/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { ConnectClient, CreateUserCommand } = require("@aws-sdk/client-connect");
// const { sendAppSyncRequest } = require("./PostConfirmationLambda/helpers/appSync.js");
const { sendAppSyncRequest } = require("./helpers/appSync.js");

const REGION = process.env.AWS_REGION;
const APPSYNCURL = process.env.API_DASHBOARD_GRAPHQLAPIENDPOINTOUTPUT;
const GQLAPIKEY = process.env.API_DASHBOARD_GRAPHQLAPIKEYOUTPUT;


const getS3file = async () => {
  const s3Client = new S3Client({region: 'us-east-1'});

  const bucketName = 'dashboard-s35ea37-staging';
  const objectKey = 'WalmartEmployeeList.csv';

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });

  try {
    const response = await s3Client.send(command);
    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await response.Body.transformToString();

    const tuples = str.split('\n').map(line => {
      const [email, role] = line.split(',');
      return [email.trim(), role.trim()];
    });

    return tuples;
    
  } catch (err) {
    console.error(err);
  }
}

const createConnectUser = async (email, securityProfileId) => {
  const connectClient = new ConnectClient({ region: "us-east-1"  });

  const inputConnect = { // CreateUserRequest
    Username: email, // required
    Password: "12345678",
    PhoneConfig: { // UserPhoneConfig
      PhoneType: "SOFT_PHONE", // required
    },
    SecurityProfileIds: [ // SecurityProfileIds 
      securityProfileId, // required
    ],
    RoutingProfileId: "4eedec70-f00b-4398-b706-8acc23437010", // required
    InstanceId: "96cb63e2-25a1-4014-8f3c-e3919415d597", // required
  };


  const commandConnect = new CreateUserCommand(inputConnect);
  const responseConnect = await connectClient.send(commandConnect);

  return responseConnect;
}


async function createDynamoDBUser(email, role) {
  const createUser = {
    query: `mutation CreateUser($input: CreateUserInput!) {
        createContact(input: $input) {
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

const findUserByEmail = (email, userData) => {
  const user = userData.find(([userEmail,]) => userEmail === email);
  return user ? user : null;
};

exports.handler = async (event, context) => {
    //connect to S3 and get a file

    const data = await getS3file(event);

    const user = findUserByEmail(event.request.username, data);

    if (user) {
      let securityProfileId = user[1] === "Agent" ? "b393134a-079a-42b5-b7ce-c23d1ab88b83 " : "aeb2a576-2506-444a-9967-98891ba6e963"
      let userRole = user[1] === "Agent" ? "Agent" : "Supervisor";

      const responseConnect = await createConnectUser(event.request.userAttributes.email, securityProfileId);
      console.log(responseConnect);

      const responseDynamoDB = await createDynamoDBUser(event.request.userAttributes.email, userRole);
      console.log(responseDynamoDB);

      return event;


    } else {
      return null;  // Return null if user is not found
    }
  };
  