// Type: Fetching data
// Description: Function that fetches data Amazon Connect


export async function fetchMetricDataV2Queue(
  queueId: string, // The queue ID
  metricDate: string // The metric date
): Promise<any> {
  const url = `http://localhost:3000/connect/GetMetricDataV2/Queue?queueIds=${queueId}&metricDate=${metricDate}`;
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


//returns
// AGENT_ANSWER_RATE, AVG_CONTACT_DURATION, AVG_HANDLE_TIME, 
//AVG_HOLD_TIME, CONTACTS_HANDLED, AVG_INTERRUPTIONS_AGENT, 
//AGENT_OCCUPANCY, SUM_NON_PRODUCTIVE_TIME_AGENT, AGENT_NON_RESPONSE