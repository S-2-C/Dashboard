import { ConnectContactLensClient, ListRealtimeContactAnalysisSegmentsCommand } from "@aws-sdk/client-connect-contact-lens"
import { make_config_json } from "@/app/apis_library/connect";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const contactId = searchParams.get("contactId") || undefined;
    const config = make_config_json();
    const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
    const client = new ConnectContactLensClient(config as any);

    const input = {
        InstanceId: InstanceId,
        ContactId: contactId
    };

    let response;
    try {
        const command = new ListRealtimeContactAnalysisSegmentsCommand(input);
        response = await client.send(command);

        // Your code that may throw a ResourceNotFoundException
    } catch (error: any) {
        if (error.name === 'ResourceNotFoundException') {
            return new Response(JSON.stringify({ message: "Contact Id not found please try again." }), {
                status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        else if (error.name === 'InvalidRequestException') {
            return new Response(JSON.stringify({ message: "Please provide a contact Id" }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        else {
            throw error; // re-throw the error if it's not a ResourceNotFoundException
        }
    }

    return Response.json(
        {
            "message": "Contact analysis segments retrieved successfully.",
            "data": response.Segments
        }
    );

}