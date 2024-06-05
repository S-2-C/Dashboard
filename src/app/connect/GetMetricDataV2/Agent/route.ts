import { ConnectClient, GetMetricDataV2Command } from "@aws-sdk/client-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { make_config_json } from "@/app/apis_library/connect";

async function getUserMetricData(
  client: ConnectClient,
  agentIdsArray: string[],
  metricDate: Date,
  currentMetricData: Date
): Promise<any> {
  const input = {
    ResourceArn: process.env.CONNECT_INSTANCE_ARN,
    StartTime: metricDate,
    EndTime: currentMetricData,
    Filters: [
      {
        FilterKey: "AGENT",
        FilterValues: agentIdsArray,
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

  const command = new GetMetricDataV2Command(input);
  const response = await client.send(command);
  return response;
}

function arrangeMetricData(response: any): any[] {
  const metrics = response.MetricResults.flatMap((result: any) =>
    result.Collections.map((metric: any) => ({
      Metric: metric.Metric.Name,
      Value: metric.Value,
    }))
  );

  return metrics;
}

export async function GET(request: Request) {
  const config = make_config_json();
  const { searchParams } = new URL(request.url);
  const agentIds = searchParams.get("agentIds") || undefined;
  let metricDate: any = searchParams.get("metricDate") || undefined;
  let currentMetricData: any =
    searchParams.get("currentMetricData") || undefined;
  console.log("metricDate: ", metricDate);
  console.log("agentIds: ", agentIds);
  console.log("currentMetricData: ", currentMetricData);

  if (!metricDate && !currentMetricData) {
    metricDate = new Date();
    currentMetricData = new Date();
  } else {
    metricDate = new Date(metricDate);
    currentMetricData = new Date(currentMetricData);
  }

  if (!agentIds) {
    return new Response(
      JSON.stringify({ message: "Please provide agent IDs" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const agentIdsArray = agentIds.split(",");

  const client = new ConnectClient(config as any);

  const response = await getUserMetricData(
    client,
    agentIdsArray,
    metricDate,
    currentMetricData
  );
  console.log("Response from GetMetricDataV2Command:", response);

  return new Response(
    JSON.stringify({
      message: "Current metric data retrieved successfully.",
      data: arrangeMetricData(response),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
