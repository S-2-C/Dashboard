// useQueueMetrics.ts
import { useEffect, useState } from "react";
import { fetchMetricDataV2Queue } from "@/fetching/fetchingMetricDataV2Queue";

interface Metric {
  Metric: string;
  Value: number;
}

export const useQueueMetrics = (channelIds: string, daysAgo: number = 7) => {
  const [queueMetrics, setQueueMetrics] = useState<Metric[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - daysAgo);
      const date = pastDate.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'

      const metricDataV2Queue = await fetchMetricDataV2Queue(channelIds, date);
      console.log("queue", metricDataV2Queue);

      setQueueMetrics(metricDataV2Queue.data);
    };

    fetchData();
  }, [channelIds, daysAgo]);

  const getMetricValue = (metricName: string) => {
    const metric = queueMetrics.find((m) => m.Metric === metricName);
    return metric ? metric.Value : "N/A";
  };

  return { queueMetrics, getMetricValue };
};

export default useQueueMetrics;
