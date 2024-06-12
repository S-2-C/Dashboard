const { S3Client, ListObjectsV2Command, GetObjectCommand, GetObjectCommandInput } = require("@aws-sdk/client-s3");
import { make_config_json, checkDateIsValid, returnError } from "@/app/apis_library/connect";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

function generateDatePrefixWav(date: string, contactId: string) {
    const dateArray = date.split("-");
    return `connect/ss2cc/CallRecordings/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}/${contactId}`;
}

async function downloadObject(bucketName: any, objectKey: any, client: any) {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
        });

        const response = await client.send(command);
        return await response.Body;
    } catch (err) {
        console.error("Error downloading object from S3:", err);
        throw err;
    }
}

function ListObjects(prefix: any, bucketName: any, client: any) {
    const bucketParams = {
        Bucket: bucketName,
        Prefix: prefix
    };
    return client.send(new ListObjectsV2Command(bucketParams));
}

function extractFirstKey(response: any) {
    return response.Contents[0].Key;
}

export async function GET(request: Request) {
    const config = make_config_json();

    // Create S3 service object

    const { searchParams } = new URL(request.url);

    const date = searchParams.get("date") || undefined;
    const contactId = searchParams.get("contactId") || undefined;

    // Check if both parameters are provided
    if (date === undefined || contactId === undefined) {
        return returnError("Please provide a date and contactId", 400);
    } else if (!checkDateIsValid(date)) {
        return returnError("Please provide a valid date in the format YYYY-MM-DD", 400);
    }

    const client = new S3Client(config as any);
    const bucketName = process.env.HISTORIC_CALL_BUCKET_NAME || "";

    const datePrefix = generateDatePrefixWav(date, contactId);
    let key_object;
    try {
        key_object = await ListObjects(datePrefix, bucketName, client);
    } catch (err) {
        return returnError("Error listing objects in the bucket", 500);
    }

    if ("Contents" in key_object === false || key_object.Contents.length === 0) {
        return returnError("No objects found in the bucket", 404);
    }

    const key = extractFirstKey(key_object);

    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: key
        });

        const url = await getSignedUrl(client, command, { expiresIn: 3600 });

        return Response.json(
            {
                "message": "Contact analysis segments retrieved successfully.",
                "data": { "url": url }
            }
        );
    } catch (err) {
        return returnError("Error generating pre-signed URL", 500);
    }
}
