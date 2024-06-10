export async function fetchListUsers(): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseUrl + "connect/ListUsers";
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
