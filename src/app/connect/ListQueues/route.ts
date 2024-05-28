import type { NextApiRequest, NextApiResponse } from "next";
import {
  ConnectClient,
  ListQueuesCommand,
  QueueType,
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

async function getQueueList(client: ConnectClient, InstanceId: string) {
  const input = {
    InstanceId: InstanceId,
  };
  const command = new ListQueuesCommand(input);
  const response = await client.send(command);
  return response;
}

function arrangeQueuesList(response: any) {
  const queue = response.QueueSummaryList;
  const queueList = queue.map((queue: any) => {
    return {
      Id: queue.Id,
      QueueType: queue.QueueType,
      Name: queue.Name || "",
    };
  });
  return queueList;
}

export async function GET(req: Request, res: Response) {
  console.log("LISTING QUEUES");
  const config = make_config_json();
  const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
  const client = new ConnectClient(config as any);

  const response = await getQueueList(client, InstanceId);
  return Response.json({
    message: "List of queues retrieved successfully.",
    data: arrangeQueuesList(response),
  });
}
