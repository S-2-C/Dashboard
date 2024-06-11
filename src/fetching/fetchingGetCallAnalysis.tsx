export async function fetchCallAnalysis(date: string, contactId: string): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/historicCalls/getCallAnalysis?date=${date}&contactId=${contactId}`;
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
