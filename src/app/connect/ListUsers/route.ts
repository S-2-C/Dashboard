import type { NextApiRequest, NextApiResponse } from 'next';
import { ConnectClient, ListUsersCommand, } from "@aws-sdk/client-connect"; // Import the required client and commands.
import { make_config_json } from "@/app/apis_library/connect";

async function getUserList(client: ConnectClient, InstanceId: string) {
    const input = {
        InstanceId: InstanceId,
    };
    const command = new ListUsersCommand(input);
    const response = await client.send(command);
    return response;
}

function arrangeUserList(response: any) {
    const users = response.UserSummaryList;
    const userList = users.map((user: any) => {
        return {
            Id: user.Id,
            Username: user.Username,
        };
    });
    return userList;
}


export async function GET() {
    const config = make_config_json();
    const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
    const client = new ConnectClient(config as any);

    const response = await getUserList(client, InstanceId)

    return Response.json({
        "message": "List of users retrieved successfully.",
        "data": arrangeUserList(response)
    });


}
