// Import connect client and commands
import { ConnectClient, DeleteUserCommand } from "@aws-sdk/client-connect";

function make_config_json() {
    return {
        region: process.env.AMAZON_REGION,
        credentials: {
            accessKeyId: process.env.CONNECT_ACCESS_KEY,
            secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
        },
    }
}

async function deleteUser(InstanceId: string, userId: string, client: ConnectClient) {
    const input: any = {
        InstanceId: InstanceId,
        UserId: userId,
    };

    const command = new DeleteUserCommand(input);
    const response = await client.send(command);
    return response;
}


export async function POST(request: Request) {
    const body = await request.json();

    // Check that request body contains a userId key 
    if (!body.userId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Missing userId in request body" }),
        };
    }

    // Check that userId is a number
    if (typeof body.userId !== "string") {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "userId must be a number" }),
        };
    }
    const userId = body.userId;

    const config = make_config_json();
    const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
    const client = new ConnectClient(config as any);

    const response: any = deleteUser(InstanceId, userId, client);
    // Check if response is successful
    if (response.$metadata.httpStatusCode === 200) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "User deleted successfully" }),
        };
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Failed to delete user" }),
        };
    }
}
