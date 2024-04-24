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

  const inputAgent = {
    ResourceArn: process.env.CONNECT_INSTANCE_ARN,
    StartTime: new Date("2024-03-28"),
    EndTime: new Date(),
    Filters: [
      {
        FilterKey: "AGENT",
        FilterValues: ["3f2a1212-1458-471f-8adb-04080c44f235"],
      },
    ],
    Metrics: [
      { Name: "AGENT_NON_RESPONSE" },
      { Name: "AVG_CONTACT_DURATION" },
      { Name: "AGENT_OCCUPANCY" },
      { Name: "AVG_HANDLE_TIME" },
      { Name: "CONTACTS_HANDLED" },
      { Name: "AGENT_ANSWER_RATE" },
      { Name: "AVG_HOLD_TIME" },
      { Name: "AVG_INTERRUPTIONS_AGENT" },
      { Name: "CONTACTS_HANDLED" },
      { Name: "SUM_NON_PRODUCTIVE_TIME_AGENT" },
    ],
  };

  const inputQueue = {
    ResourceArn: process.env.CONNECT_INSTANCE_ARN,
    StartTime: new Date("2024-03-28"),
    EndTime: new Date(),
    Filters: [
      {
        FilterKey: "QUEUE",
        FilterValues: ["f617a7d6-2be6-4f9b-b365-600fd3fc8646"],
      },
    ],
    Metrics: [
      { Name: "CONTACTS_QUEUED" },
      { Name: "AVG_RESOLUTION_TIME" },
      { Name: "AVG_TALK_TIME" },
      { Name: "AVG_QUEUE_ANSWER_TIME" },
      { Name: "AVG_CASE_RESOLUTION_TIME" },
      { Name: "CONTACTS_HANDLED" },
    ],
  };

  // const command = new GetMetricDataV2Command(inputAgent);
  // const command1 = new GetMetricDataV2Command(inputQueue);
  // const response = await client.send(command);
  // return Response.json(response);
  try {
    const responses = await Promise.all([
      client.send(new GetMetricDataV2Command(inputAgent)),
      client.send(new GetMetricDataV2Command(inputQueue)),
    ]);

    // Combine results
    const combinedResponse = {
      data1: responses[0],
      data2: responses[1],
    };

    return Response.json(combinedResponse);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return res.status(500).json({ error: "Failed to fetch metrics" });
  }
}
