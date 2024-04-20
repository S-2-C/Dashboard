import { ConnectClient, GetMetricDataV2Command } from "@aws-sdk/client-connect";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  console.log("HOla");

  if (
    !process.env.REGION ||
    !process.env.CONNECT_ACCESS_KEY ||
    !process.env.CONNECT_SECRET_ACCESS_KEY
  )
    return new Response("Environmental variables are missing");
  const client = new ConnectClient({
    region: process.env.AMAZON_REGION,
    credentials: {
      accessKeyId: process.env.CONNECT_ACCESS_KEY,
      secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
    },
  });

  const input = {
    ResourceArn: process.env.CONNECT_INSTANCE_ARN,
    StartTime: new Date("2024-03-18"),
    EndTime: new Date("2024-04-19"),
    Filters: [
      {
        FilterKey: "AGENT",
        FilterValues: ["3f2a1212-1458-471f-8adb-04080c44f235"],
      },
    ],
    Metrics: [
      {
        Name: "AGENT_ANSWER_RATE",
      },
    ],
  };
  console.log(input);

  const command = new GetMetricDataV2Command(input);
  const response = await client.send(command);
  return Response.json(response);
  // return new Response("Not Implementes Yet", {
  //   status: 501,
  // });
}
