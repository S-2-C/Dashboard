export async function updateRoutingProfiles(): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseUrl + "connect/AutomaticRoutingProfilesUpdate";
    try {
        const response = await fetch(url, {
            method: 'PATCH',
        });
        if (!response.ok) {
            console.log("Error updating routing profiles");
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json(); // Parses the JSON response
    } catch (error) {
        console.log("Error updating routing profiles");
        return null; // Handle errors or return a default value
    }
}
