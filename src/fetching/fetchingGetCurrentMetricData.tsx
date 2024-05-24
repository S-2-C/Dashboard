// You may need to install node-fetch if using this in a Node.js environment
// npm install node-fetch
// import fetch from 'node-fetch';

export async function fetchCurrentMetricData(queueId: string): Promise<any> {
    const url = "http://localhost:3000/connect/GetCurrentMetricData?queueIds=" + queueId;
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
