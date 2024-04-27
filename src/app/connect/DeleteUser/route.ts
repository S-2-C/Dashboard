// Import connect client and commands
import { ConnectClient, DeleteUserCommand } from "@aws-sdk/client-connect";
import { make_config_json } from "@/app/apis_library/connect";

async function deleteUser(InstanceId: string, userId: string, client: ConnectClient) {
    const input: any = {
        InstanceId: InstanceId,
        UserId: userId,
    };
    try {
        const command = new DeleteUserCommand(input);
        const response: any = await client.send(command);

        return response;
    }
    catch (err) {
        console.error(err);
    }
    return { $metadata: { httpStatusCode: 400 } };
}


export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || undefined;


    // Check that request body contains a userId key 
    if (userId === undefined) {
        return new Response(JSON.stringify({ message: "Please provide a userId" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    }

    const config = make_config_json();
    const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
    const client = new ConnectClient(config as any);

    //const response: any = deleteUser(InstanceId, userId, client);
    const response = await deleteUser(InstanceId, userId, client);
    // Check if response is successful
    if (response.$metadata.httpStatusCode === 200) {
        return Response.json({ message: "User deleted successfully" });
    } else {
        return new Response(JSON.stringify({ message: "Please provide a valid userId" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
