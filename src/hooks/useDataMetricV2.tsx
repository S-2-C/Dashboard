import { useEffect, useState } from "react";
import { fetchMetricDataV2Queue } from "@/fetching/fetchingMetricDataV2Queue";
import { fetchMetricDataV2Agent } from "@/fetching/fetchingMetricDataV2Agent";

export interface Metric {
  Metric: string;
  Value: number;
}

const useQueueMetrics = (channelIds: string, daysAgo: number = 7) => {
  const [queueMetrics, setQueueMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - daysAgo);
      const date = pastDate.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'

      const metricDataV2Queue = await fetchMetricDataV2Queue(
        channelIds,
        date,
        today.toISOString()
      );
      console.log("queue", metricDataV2Queue);

      setQueueMetrics(metricDataV2Queue?.data);
    };

    fetchData();
  }, [channelIds, daysAgo]);

  const getMetricValue = (metricName: string) => {
    if (!queueMetrics) return console.error("No metrics found for queue");
    const metric = queueMetrics.find((m) => m.Metric === metricName);
    return metric ? metric.Value : "N/A";
  };

  return { queueMetrics, getMetricValue };
};

const useAgentMetrics = (agentIds: string[], daysAgo: number = 7) => {
  const [agentMetrics, setAgentMetrics] = useState<Record<string, Metric[]>>(
    {}
  );



  const getMetricValue = (agentId: string, metricName: string) => {
    const metrics = agentMetrics[agentId] || [];
    if (!metrics) return console.error("No metrics found for agent", agentId);
    const metric = metrics.find((m) => m.Metric === metricName);
    return metric ? metric.Value : "N/A";
  };

  return { agentMetrics, getMetricValue };
};

export { useQueueMetrics };
