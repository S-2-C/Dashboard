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

// Function for updating a fixture
async function createContact(phone, id, callStart, userContactsId) {
  const createContact = {
    query: `mutation CreateContact($input: CreateContactInput!) {
        createContact(input: $input) {
            phone
            id
            callStart
            userContactsId
        }
      }`,
    variables: {
      input: {
        phone,
        id,
        callStart,
        userContactsId,
      },
    },
  };
  console.log(`Declared createContact with id ${id}`);

  const createContactRes = await sendAppSyncRequest(
    APPSYNCURL,
    REGION,
    "POST",
    createContact,
    GQLAPIKEY
  );

  if (!createContactRes.data[`createContact`]) {
    console.error(`Could not create contact with id ${id}`);
  }

  console.log(`Created contact with id ${id}`);

  return createContactRes.data[`createContact`];
}

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const contactID = event.Details.Parameters.contactID;
  const phone = event.Details.ContactData.CustomerEndpoint.Address;
  const agentUsername = event.Details.ContactData.Attributes.agentUsername;

  const callStart = new Date().toISOString();
  try {
    const res = await createContact(phone, contactID, callStart, agentUsername);
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (error) {
    console.error(`Error creating contact: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify(`Error creating contact: ${error}`),
    };
  }
};
