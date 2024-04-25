import { ConnectContactLensClient, ListRealtimeContactAnalysisSegmentsCommand } from "@aws-sdk/client-connect-contact-lens"
import { Contact } from "lucide-react";
import type { NextApiRequest, NextApiResponse } from 'next';
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
    console.log(input);

    const command = new ListRealtimeContactAnalysisSegmentsCommand(input);
    const response = await client.send(command);

    console.log(JSON.stringify(response, null, 2));

    return null;

}