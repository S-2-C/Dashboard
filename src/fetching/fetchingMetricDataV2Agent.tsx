export async function fetchMetricDataV2Agent(
    queueId: string, // The queue ID
    metricDate: string, // The metric date
    currentMetricData: string // The current metric data
): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}connect/GetMetricDataV2/Agent?agentIds=${queueId}&metricDate=${metricDate}&currentMetricData=${currentMetricData}`;
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
