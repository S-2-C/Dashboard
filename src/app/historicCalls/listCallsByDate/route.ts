// Import connect client and commands
const { S3Client, ListObjectsV2Command } = require("@aws-sdk/client-s3");
import { make_config_json, returnError } from "@/app/apis_library/connect";


function generateDatePrefix(date: string) {
    const dateArray = date.split("-");
    return `connect/ss2cc/CallRecordings/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}`;

}

function getContactIdFromKey(key: string) {
    const keyArray = key.split("/");
    return keyArray[keyArray.length - 1].split(".")[0];
}


function getContactIdsFromResponse(response: any) {
    const contactIds: string[] = [];
    console.log("Response", response);
    response.Contents.forEach((content: any) => {
        contactIds.push(getContactIdFromKey(content.Key));
    });
    return contactIds;
}


function checkDateIsValid(date: string) {
    const dateArray = date.split("-");
    if (dateArray.length !== 3) {
        return false;
    }

    if (dateArray[0].length !== 4 || dateArray[1].length !== 2 || dateArray[2].length !== 2) {
        return false;
    }
    // Check if date numbers are valid
    if (isNaN(Number(dateArray[0])) || isNaN(Number(dateArray[1])) || isNaN(Number(dateArray[2]))) {
        return false;
    }

    // Check if month is valid
    if (Number(dateArray[1]) < 1 || Number(dateArray[1]) > 12) {
        return false;
    }

    // Check if day is valid
    if (Number(dateArray[2]) < 1 || Number(dateArray[2]) > 31) {
        return false;
    }

    // Check if day is valid for month
    if (Number(dateArray[1]) === 2 && Number(dateArray[2]) > 29) {
        return false;
    }

    return true;
}

export async function GET(request: Request) {
    const config = make_config_json();

    // Create S3 service object
    const client = new S3Client(config as any);
    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date") || undefined;

    // Check if the bucket exists
    const bucketName = process.env.HISTORIC_CALL_BUCKET_NAME || "";

    if (date === undefined) {
        return returnError("Please provide a date", 400);
    }
    else if (!checkDateIsValid(date)) {
        return returnError("Please provide a valid date in the format YYYY-MM-DD", 400);
    }
    const datePrefix = generateDatePrefix(date);

    const bucketParams = {
        Bucket: bucketName,
        Prefix: datePrefix
    };

    console.log("Bucket Params", bucketParams);
    // List the items in the bucket
    let data;
    try {
        data = await client.send(new ListObjectsV2Command(bucketParams));
    } catch (err) {
        return returnError("Error listing objects in the bucket", 500);
    }

    const contactIds = getContactIdsFromResponse(data);
    // Return the contact IDs in Object format body: {"message": "Success", "data": ["contactId1", "contactId2"]}
    return new Response(JSON.stringify({ message: "Successfully returned the list of objects.", data: { "contactIds": contactIds } }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}




