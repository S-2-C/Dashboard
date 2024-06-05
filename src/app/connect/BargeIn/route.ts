import {
  ConnectClient,
  MonitorContactCommand,
  MonitorContactCommandInput,
} from "@aws-sdk/client-connect"; // Import the required client and commands.

function make_config_json() {
  return {
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.CONNECT_ACCESS_KEY,
      secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
    },
  };
}

export async function GET(req: Request) {
  const config = make_config_json();
  const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
  const client = new ConnectClient(config as any);

  const { searchParams } = new URL(req.url);
  const ContactId = searchParams.get("ContactId") || undefined;
  const UserId = searchParams.get("UserId") || undefined;

  const input: MonitorContactCommandInput = {
    InstanceId: InstanceId,
    ContactId: ContactId,
    UserId: UserId,
    AllowedMonitorCapabilities: ["SILENT_MONITOR"],
  };

  const command = new MonitorContactCommand(input);
  let response;
  try {
    response = await client.send(command);
  } catch (error) {
    return Response.json({
      message: "Failed to monitor contact for barge-in. userId: " + UserId,
      error: error,
    });
  }

  return Response.json({
    message: "Contact monitored successfully for barge-in. userId: " + UserId,
    data: response,
  });
}
