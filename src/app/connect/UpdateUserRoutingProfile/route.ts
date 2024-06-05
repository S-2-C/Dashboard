import { ConnectClient, ListUsersCommand, ListUsersCommandOutput, UserSummary, UpdateUserRoutingProfileCommand, } from "@aws-sdk/client-connect";
import { make_config_json } from "@/app/apis_library/connect";




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

    const { userName, routingProfileId } = body;

    // Check that the request body contains the required fields and if not return a 400 error
    if (!userName || !routingProfileId) {
        return Response.json({
            "message": "Request body is missing required fields.",
        }, {
            status: 400,
        });
    }

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