import { ConnectClient, GetMetricDataV2Command } from "@aws-sdk/client-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { make_config_json } from "@/app/apis_library/connect";

async function getUserMetricData(
  client: ConnectClient,
  queueIdsArray: string[],
  metricDate: Date
): Promise<any> {
  console.log(metricDate);
  console.log(new Date());
  console.log("queueIdsArray: ", queueIdsArray);
  const input = {
    ResourceArn: process.env.CONNECT_INSTANCE_ARN,
    StartTime: metricDate,
    EndTime: new Date(),
    Filters: [
      {
        FilterKey: "QUEUE",
        FilterValues: queueIdsArray,
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
  console.log(input);

  const command = new GetMetricDataV2Command(input);
  const response = await client.send(command);
  return response;
}

function arrangeMetricData(response: any): any[] {
  const groupedByQueue: { [key: string]: any[] } = {};

  response.MetricResults.forEach((result: any) => {
    const queueId = result.Dimensions.Queue.Id;
    if (!groupedByQueue[queueId]) {
      groupedByQueue[queueId] = [];
    }

    result.Collections.forEach((metric: any) => {
      groupedByQueue[queueId].push({
        Metric: metric.Metric.Name,
        Value: metric.Value,
      });
    });
  });

  return Object.keys(groupedByQueue).map((queueId) => ({
    queue: queueId,
    queue_metrics: groupedByQueue[queueId],
  }));
}

export async function GET(request: Request) {
  const config = make_config_json();
  const { searchParams } = new URL(request.url);
  const queueIds = searchParams.get("queueIds") || undefined;
  let metricDate: any = searchParams.get("metricDate") || undefined;
  console.log("metricDate: ", metricDate);
  console.log("queueIds: ", queueIds);

  if (!metricDate) {
    metricDate = new Date();
  } else {
    metricDate = new Date(metricDate);
  }

  if (!queueIds) {
    return new Response(
      JSON.stringify({ message: "Please provide a queue ID" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const queueIdsArray = queueIds.split(",");

  const client = new ConnectClient(config as any);

  const response = await getUserMetricData(client, queueIdsArray, metricDate);

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
