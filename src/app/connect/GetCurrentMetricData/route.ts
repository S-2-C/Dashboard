import {
  ConnectClient,
  GetCurrentMetricDataCommand,
  GetCurrentMetricDataCommandInput,
} from "@aws-sdk/client-connect";
import { make_config_json } from "@/app/apis_library/connect";
import { json } from "stream/consumers";

async function getUserMetricData(
  client: ConnectClient,
  InstanceId: string,
  queueIdsArray: string[]
): Promise<any> {
  const input: GetCurrentMetricDataCommandInput = {
    InstanceId: InstanceId,
    CurrentMetrics: [
      {
        Name: "AGENTS_AVAILABLE",
        Unit: "COUNT",
      },
      {
        Name: "AGENTS_ON_CALL",
        Unit: "COUNT",
      },
    ],
    Filters: {
      Queues: queueIdsArray,
      Channels: ["VOICE"],
    },
    Groupings: ["QUEUE", "CHANNEL"],
    SortCriteria: [
      {
        SortByMetric: "AGENTS_AVAILABLE",
        SortOrder: "ASCENDING",
      },
    ],
  };

  const command = new GetCurrentMetricDataCommand(input);
  const response = await client.send(command);
  // Print stringified response

  return response;
}

function arrangeMetricData(response: any): any[] {
  // Create an empty object to group metrics by Queue ID
  const groupedByQueue: { [key: string]: any[] } = {};

  // Iterate over each MetricResult and group metrics by Queue ID
  response.MetricResults.forEach((result: any) => {
    const queueId = result.Dimensions.Queue.Id; // Get the Queue ID
    if (!groupedByQueue[queueId]) {
      groupedByQueue[queueId] = []; // Initialize array if not already present
    }

    // Add each metric to the corresponding queue group
    result.Collections.forEach((metric: any) => {
      groupedByQueue[queueId].push({
        Metric: metric.Metric.Name,
        Value: metric.Value
      });
    });
  });

  // Convert the grouped object into the desired array format
  return Object.keys(groupedByQueue).map((queueId) => ({
    queue: queueId,
    queue_metrics: groupedByQueue[queueId]
  }));
}


export async function GET(request: Request) {
  const config = make_config_json();
  // Get the queueIDs from the request
  const { searchParams } = new URL(request.url);
  const queueIds = searchParams.get("queueIds") || undefined;

  if (queueIds === undefined) {
    return new Response(JSON.stringify({ message: "Please provide a queue ID" }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const queueIdsArray = queueIds.split(",");

  const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
  const client = new ConnectClient(config as any);

  const response = await getUserMetricData(client, InstanceId, queueIdsArray);

  return Response.json({
    "message": "Current metric data retrieved successfully.",
    "data": arrangeMetricData(response)
  });
}