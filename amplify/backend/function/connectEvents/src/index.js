/* Amplify Params - DO NOT EDIT
    API_DASHBOARD_GRAPHQLAPIENDPOINTOUTPUT
    API_DASHBOARD_GRAPHQLAPIIDOUTPUT
    API_DASHBOARD_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

const REGION = process.env.AWS_REGION;
const APPSYNCURL = process.env.API_DASHBOARD_GRAPHQLAPIENDPOINTOUTPUT;
const GQLAPIKEY = process.env.API_DASHBOARD_GRAPHQLAPIKEYOUTPUT;
const { sendAppSyncRequest } = require("./helpers/appSync.js");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// function to handle calls being disconnected -> should update api with call end time
async function updateCallEnd(event) {
  const contactId = event.detail.contactId;
  const agentArn = event.detail.agentInfo.agentArn;

  const endCall = {
    query: `mutation CallEnd($contactId: ID!, $callEnd: AWSDateTime!) {
            updateContact(input: {id: $contactId, callEnd: $callEnd}) {
                phone
                id
                userContactsId
                callStart
                callEnd
            }
          }`,

    variables: {
      contactId: contactId,
      callEnd: new Date().toISOString(),
    },
  };

  const getUserByArn = {
    query: `query GetUserByArn($arn: String!) {
            usersByArn(arn: $arn) {
                items {
                    id
                    arn
                    isOnCall
                }
            }
        }`,
    variables: {
      arn: agentArn,
    },
  };

  // get user by arn
  let getUserByArnRes;
  try {
    getUserByArnRes = await sendAppSyncRequest(
      APPSYNCURL,
      REGION,
      "POST",
      getUserByArn,
      GQLAPIKEY
    );
    console.log(`Got user with arn ${agentArn} from the database`);
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        `Could not get user by arn ${agentArn}. Error: ${error}`
      ),
    };
  }
  console.log(getUserByArnRes);
  const setUserOffCall = {
    query: `mutation SetUserOnCall($id: AWSEmail!, $isOnCall: Boolean!) {
            updateUser(input: {id: $id, isOnCall: $isOnCall}) {
                arn
                createdAt
                id
                isOnCall
                name
                needsHelp
                profilePic
                role
                updatedAt
            }
        }`,
    variables: {
      id: getUserByArnRes.data.usersByArn.items[0].id,
      isOnCall: false,
    },
  };

  // update call end time
  let endCallRes;
  try {
    endCallRes = await sendAppSyncRequest(
      APPSYNCURL,
      REGION,
      "POST",
      endCall,
      GQLAPIKEY
    );
    console.log(`Updated call end time for contact with id ${contactId}`);
  } catch (error) {
    console.error(
      `Could not update call end time for contact with id ${contactId}`
    );
    console.error(endCallRes);
    return {
      statusCode: 500,
      body: JSON.stringify(
        `Could not update call end time for contact with id ${contactId}. Error: ${error}`
      ),
    };
  }

  // set user off call
  let setUserOffCallRes;
  try {
    setUserOffCallRes = await sendAppSyncRequest(
      APPSYNCURL,
      REGION,
      "POST",
      setUserOffCall,
      GQLAPIKEY
    );
    console.log(`Updated user with arn ${agentArn} to be off call`);
  } catch (error) {
    console.error(`Could not set user off call with arn: ${agentArn}`);
    return {
      statusCode: 500,
      body: JSON.stringify(
        `Could not set user off call with arn: ${agentArn}. Error: ${error}`
      ),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      endCallRes.data["endCall"],
      setUserOffCallRes.data["setUserOffCall"]
    ),
  };
}

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const eventType = event.detail.eventType;

  switch (eventType) {
    case "DISCONNECTED":
      return updateCallEnd(event);

    default:
      return {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  },
        body: JSON.stringify("No action for this event type."),
      };
  }
};
