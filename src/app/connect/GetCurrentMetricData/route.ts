import {
  ConnectClient,
  GetCurrentMetricDataCommand,
  GetCurrentMetricDataCommandInput,
} from "@aws-sdk/client-connect";
import { make_config_json } from "@/app/apis_library/connect";
import { json } from "stream/consumers";

async function getUserMetricData(
  client: ConnectClient,
  InstanceId: string
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
      Queues: [
        "fe0bd989-c3d1-4959-a47c-b7d27def9a99",
        "3f2a1212-1458-471f-8adb-04080c44f235",
        "ab454c37-6f3e-4c50-9b01-e0f262ad5336",
      ],
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

  const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
  const client = new ConnectClient(config as any);

  const response = await getUserMetricData(client, InstanceId);

  return Response.json({
    "message": "Current metric data retrieved successfully.",
    "data": arrangeMetricData(response)
  });
}