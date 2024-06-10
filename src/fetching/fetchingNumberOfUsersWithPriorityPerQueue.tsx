export async function fetchNumberOfUsersWithQueuePriority(): Promise<any> {
    // not including the equal priority routing profile
    const routingProfileIdToQueueId: Record<string, string> = {
        "569ac066-3c53-4294-ab36-dfedffe98eb7": "fe0bd989-c3d1-4959-a47c-b7d27def9a99", // pass
        "84a12146-775a-444b-9c98-8c2beb7ceda2": "f617a7d6-2be6-4f9b-b365-600fd3fc8646", // physical store
        "d185493b-9f03-4033-ad76-6eab8bd4c87e": "4948d5e2-1434-44dd-a78f-37cbeb96d1d9", // online
        "e56ea602-6b98-47e4-8faa-e7d8f100ed84": "46bf33f7-3381-4db1-a3f7-85eafdf04578", // delivery
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = baseUrl + "connect/ListUsersByRoutingProfile";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const res = await response.json();
        const userDataList = res.data.UserDataList;

        const usersWithPriorityPerQueue: Record<string, number> = {};
        for (const routingProfileId in routingProfileIdToQueueId) {
            usersWithPriorityPerQueue[routingProfileIdToQueueId[routingProfileId]] =
                userDataList.filter((user: any) => user.RoutingProfile.Id === routingProfileId).length;
        }

        return usersWithPriorityPerQueue; // Parses the JSON response
    } catch (error) {
        console.error("Fetching error: ", error);
        return null; // Handle errors or return a default value
    }
}
