import {
  ConnectClient,
  GetCurrentMetricDataCommand,
  GetCurrentMetricDataCommandInput,
} from "@aws-sdk/client-connect";

// Configuración del cliente (debes proporcionar esta configuración)
function makeConfig(): any {
  return {
    region: process.env.AMAZON_REGION,
    credentials: {
      accessKeyId: process.env.CONNECT_ACCESS_KEY,
      secretAccessKey: process.env.CONNECT_SECRET_ACCESS_KEY,
    },
  };
}

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
  return response;
}

function arrangeMetricData(response: any): { Metric: string; Value: number }[] {
  return response.MetricResults.flatMap((result: any) =>
    result.Collections.map((metric: any) => ({
      Metric: metric.Metric.Name,
      Value: metric.Value,
    }))
  );
}

export async function GET(request: Request) {
  const config = makeConfig();
  const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
  const client = new ConnectClient(config as any);

  const response = await getUserMetricData(client, InstanceId);

  return Response.json({
    "httpStatusCode": 200,
    "message": "Current metric data retrieved successfully.",
    "data": arrangeMetricData(response)
});
}
