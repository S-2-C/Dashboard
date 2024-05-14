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

    try {
        const endCallRes = await sendAppSyncRequest(
            APPSYNCURL,
            REGION,
            "POST",
            endCall,
            GQLAPIKEY
        );
        console.log(`Updated call end time for contact with id ${contactId}`);

        return {
            statusCode: 200,
            body: JSON.stringify(endCallRes.data["endCall"]),
        };
    } catch (error) {
        console.error(`Could not update call end time for contact with id ${contactId}`);
        return {
            statusCode: 500,
            body: JSON.stringify(`Could not update call end time for contact with id ${contactId}. Error: ${error}`),
        };
    }
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
                body: JSON.stringify('No action for this event type.'),
            };

    }

};
