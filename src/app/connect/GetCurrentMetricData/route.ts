import type { NextApiRequest, NextApiResponse } from 'next';
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

async function getUserMetricData(client: ConnectClient,  InstanceId: string): Promise<any> {
  const input: GetCurrentMetricDataCommandInput = {
    InstanceId: InstanceId,
    CurrentMetrics: [
      {
        Name: "AGENTS_AVAILABLE",
        Unit: "COUNT"
      },
      {
        Name: "AGENTS_ON_CALL",
        Unit: "COUNT"
      },
    ],
    Filters: { 
      Queues: [ 
        "fe0bd989-c3d1-4959-a47c-b7d27def9a99", "3f2a1212-1458-471f-8adb-04080c44f235", "ab454c37-6f3e-4c50-9b01-e0f262ad5336"
      ],
      Channels: [ 
        "VOICE"
      ],
    },
    Groupings: [ 
      "QUEUE", "CHANNEL"
    ],
    SortCriteria: [
      {
        SortByMetric: "AGENTS_AVAILABLE",
        SortOrder: "ASCENDING"
      },
    ]
  };

    const command = new GetCurrentMetricDataCommand(input);
    const response = await client.send(command);
    return response;
}

/*
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
*/

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const config = makeConfig();
  const InstanceId: string = process.env.CONNECT_INSTANCE_ID || "";
  const client = new ConnectClient(config as any);

  const response = await getUserMetricData(client, InstanceId)

  return Response.json(response);


}

