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
        "queueARN",
      ],
      Channels: [ // Channels
        "VOICE" || "CHAT" || "TASK",
      ],
      RoutingProfiles: [ // RoutingProfiles
        "STRING_VALUE",
      ],
      RoutingStepExpressions: [ // RoutingExpressions
        "STRING_VALUE",
      ],
    },
    Groupings: [ // Groupings
      "QUEUE" || "CHANNEL" || "ROUTING_PROFILE" || "ROUTING_STEP_EXPRESSION",
    ],
    CurrentMetrics: [ // CurrentMetrics // required
      { // CurrentMetric
        Name: "AGENTS_ONLINE" || "AGENTS_AVAILABLE" || "AGENTS_ON_CALL" || "AGENTS_NON_PRODUCTIVE" || "AGENTS_AFTER_CONTACT_WORK" || "AGENTS_ERROR" || "AGENTS_STAFFED" || "CONTACTS_IN_QUEUE" || "OLDEST_CONTACT_AGE" || "CONTACTS_SCHEDULED" || "AGENTS_ON_CONTACT" || "SLOTS_ACTIVE" || "SLOTS_AVAILABLE",
        Unit: "SECONDS" || "COUNT" || "PERCENT",
      },
    ],
    NextToken: "STRING_VALUE",
    MaxResults: Number("int"),
    SortCriteria: [ // CurrentMetricSortCriteriaMaxOne
      { // CurrentMetricSortCriteria
        SortByMetric: "AGENTS_ONLINE" || "AGENTS_AVAILABLE" || "AGENTS_ON_CALL" || "AGENTS_NON_PRODUCTIVE" || "AGENTS_AFTER_CONTACT_WORK" || "AGENTS_ERROR" || "AGENTS_STAFFED" || "CONTACTS_IN_QUEUE" || "OLDEST_CONTACT_AGE" || "CONTACTS_SCHEDULED" || "AGENTS_ON_CONTACT" || "SLOTS_ACTIVE" || "SLOTS_AVAILABLE",
        SortOrder: "ASCENDING" || "DESCENDING",
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

