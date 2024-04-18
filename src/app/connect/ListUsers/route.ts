import { ConnectClient, ListUsersCommand, } from "@aws-sdk/client-connect"; // ES Modules import
// const { ConnectClient, ListUsersCommand } = require("@aws-sdk/client-connect"); // CommonJS import


function make_config_json() {
    return {
        region: process.env.AMAZON_REGION,
        credentials: {
            accessKeyId: process.env.CONNECT_ACCESS_KEY,
            secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
        },
    }
}

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
    console.log("Hello from historic")
    const config = make_config_json();
    const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
    const client = new ConnectClient(config as any);

    const response = await getUserList(client, InstanceId)

    console.log(response)

    return {
        statusCode: 200,
        body: JSON.stringify(arrangeUserList(response)),
    };

}
