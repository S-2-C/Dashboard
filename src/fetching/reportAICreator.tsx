// Type: Fetching data
// Description: Function that fetches data Amazon Connect


export async function AIReportMaker(
    content: string, // The queue ID
): Promise<any> {
    console.log("content", content);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}reportMaker?content=${content}`;
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

