export async function fetchMetricDataV2Agent(
  queueId: string,
  metricDate: string
): Promise<any> {
  const url = `http://localhost:3000/connect/GetMetricDataV2/Agent?agentIds=${queueId}&metricDate=${metricDate}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json(); // Parses the JSON response
  } catch (error) {
    console.error("Fetching error: ", error);
    return null; // Handle errors or return a default value
  }
}
