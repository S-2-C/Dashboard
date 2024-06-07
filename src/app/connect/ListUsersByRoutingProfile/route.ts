import { make_config_json } from "@/app/apis_library/connect";
import { ConnectClient, GetCurrentUserDataCommand } from "@aws-sdk/client-connect";

async function getUsersByRoutingProfile(client: ConnectClient, instanceId: string) {
    const input = { // GetCurrentUserDataRequest
        InstanceId: instanceId, 
        Filters: { 
            RoutingProfiles: [ // RoutingProfiles
                "4eedec70-f00b-4398-b706-8acc23437010",
                "d185493b-9f03-4033-ad76-6eab8bd4c87e",
                "84a12146-775a-444b-9c98-8c2beb7ceda2",
                "569ac066-3c53-4294-ab36-dfedffe98eb7",
                "e56ea602-6b98-47e4-8faa-e7d8f100ed84"
            ],
        },
    };
    const command = new GetCurrentUserDataCommand(input);
    return await client.send(command);
}

export async function GET() {
    const config = make_config_json();
    const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
    const client = new ConnectClient(config as any);

    const response = await getUsersByRoutingProfile(client, InstanceId)

    return Response.json({
        "message": "List of users by routing profile retrieved successfully.",
        "data": response
    });
}