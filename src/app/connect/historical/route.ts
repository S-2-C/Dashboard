import { ConnectClient, GetMetricDataV2Command } from "@aws-sdk/client-connect";

async function getData() {
  if (
    !process.env.AMAZON_REGION ||
    !process.env.CONNECT_ACCESS_KEY ||
    !process.env.CONNECT_SECRET_ACCESS_KEY
  )
    throw new Error("NO KEYS");
  const client = new ConnectClient({
    region: process.env.AMAZON_REGION,
    credentials: {
      accessKeyId: process.env.CONNECT_ACCESS_KEY,
      secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
    },
  });

  const input = {
    ResourceArn: process.env.CONNECT_INSTANCE_ARN,
    StartTime: new Date(),
    EndTime: new Date(),
  };
  // const command = new GetMetricDataV2Command(input);
  // const response = await client.send(command);
  // return Response.json(response);
  return new Response("Not Implementes Yet", {
    status: 501,
  });
}

export async function GET() {
  return new Response("Hello from historic");
}
