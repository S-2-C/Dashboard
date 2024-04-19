import { ConnectClient, GetCurrentMetricDataCommand, GetCurrentMetricDataCommandInput } from "@aws-sdk/client-connect";

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

async function getUserMetricData(InstanceId: string, client: ConnectClient): Promise<any> {
  const input: GetCurrentMetricDataCommandInput = {
    InstanceId: InstanceId,
    Filters: { // Filters
      Queues: [ // Queues
        "fe0bd989-c3d1-4959-a47c-b7d27def9a99",
      ],
      Channels: [ // Channels
        "VOICE" || "CHAT" || "TASK",
      ],
    },
    Groupings: [ // Groupings
      "QUEUE" || "CHANNEL" || "ROUTING_PROFILE" || "ROUTING_STEP_EXPRESSION",
    ],
    CurrentMetrics: [ // CurrentMetrics // required
      { // CurrentMetric
        Name: "AGENTS_ONLINE",
        Unit: "COUNT",
      },
    ],
  };


  const command = new GetCurrentMetricDataCommand(input);
  const response = await client.send(command);
  return response;
}

function arrangeMetricData(response: any): any {
  const metricData = response.MetricResults;
  const metricDataList = metricData.map((metric: any) => {
    return {
      MetricName: metric.MetricName,
      MetricValue: metric.Value,
    };
  });
  return metricDataList;
}

export async function GET(): Promise<any> {
  const config = makeConfig();
  const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
  const client = new ConnectClient(config as any);

  const response = await getUserMetricData(InstanceId, client);

  console.log(response);

  return {
    statusCode: 200,
    body: JSON.stringify(arrangeMetricData(response)),
  };
}

