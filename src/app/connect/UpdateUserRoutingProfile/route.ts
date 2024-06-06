import { ConnectClient, ListUsersCommand, ListUsersCommandOutput, UserSummary, UpdateUserRoutingProfileCommand, } from "@aws-sdk/client-connect";
import { make_config_json } from "@/app/apis_library/connect";

const routingProfileToId = {
    "EQUAL_PRIORITY" : "4eedec70-f00b-4398-b706-8acc23437010",
    "ONLINE_PRIORITY" : "d185493b-9f03-4033-ad76-6eab8bd4c87e",
    "PHYSICAL_PRIORITY" : "84a12146-775a-444b-9c98-8c2beb7ceda2",
    "PASS_PRIORITY" : "569ac066-3c53-4294-ab36-dfedffe98eb7",
    "DELIVERY_PRIORITY" : "e56ea602-6b98-47e4-8faa-e7d8f100ed84"
}


const updateUserRoutingProfile = async (instanceId: any, userId: any, routingProfileId: any, client: any) => {
    const command = new UpdateUserRoutingProfileCommand({
        InstanceId: instanceId,
        UserId: userId,
        RoutingProfileId: routingProfileId
    });

    try {
        const response = await client.send(command);
        console.log('Routing profile updated successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to update routing profile:', error);
        return error;
    }
};

const getUserIdByUsername = async (client: ConnectClient, instanceId: string, username: string): Promise<string> => {
    const command = new ListUsersCommand({ InstanceId: instanceId });
    const response: ListUsersCommandOutput = await client.send(command);
    const users: UserSummary[] = response.UserSummaryList || [];

    const user = users.find(user => user.Username === username);

    if (user) {
        return user.Id as string;
    } else {
        return '';
    }

};

export async function PUT(request: any) {
    const body = await request.json();

    const { userName, routingProfile } = body;

    // Check that the request body contains the required fields and if not return a 400 error
    if (!userName || !routingProfile) {
        return Response.json({
            "message": "Request body is missing required fields.",
        }, {
            status: 400,
        });
    }

    // Check that the routing profile is valid
    if (!(routingProfile in routingProfileToId)) {
        return Response.json({
            "message": "Request routing profile is not valid.",
        }, {
            status: 400,
        })
    }

    const routingProfileId = routingProfileToId[routingProfile as keyof Object];

    const config = make_config_json();

    const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
    const client = new ConnectClient(config as any);

    const userId = await getUserIdByUsername(client, InstanceId, userName);
    if (userId === '') {
        return Response.json({
            "message": "User not found.",
        }, {
            status: 404,
        });
    }

    updateUserRoutingProfile(InstanceId, userId, routingProfileId, client);

    return Response.json({
        "message": "User routing profile updated successfully.",
    });
}