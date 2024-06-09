import { ConnectClient, ListUsersCommand, ListUsersCommandOutput, UserSummary, UpdateUserRoutingProfileCommand, } from "@aws-sdk/client-connect";
import { make_config_json } from "@/app/apis_library/connect";

// equal priority routing profile not in map since not associated to specific queue
const queueIdToRoutingProfile: Record<string, string> = {
    "fe0bd989-c3d1-4959-a47c-b7d27def9a99": "569ac066-3c53-4294-ab36-dfedffe98eb7", // pass
    "f617a7d6-2be6-4f9b-b365-600fd3fc8646": "84a12146-775a-444b-9c98-8c2beb7ceda2", // physical store
    "4948d5e2-1434-44dd-a78f-37cbeb96d1d9": "d185493b-9f03-4033-ad76-6eab8bd4c87e", // online
    "46bf33f7-3381-4db1-a3f7-85eafdf04578": "e56ea602-6b98-47e4-8faa-e7d8f100ed84", // delivery
};

const equalPriorityRoutingProfile = "4eedec70-f00b-4398-b706-8acc23437010";

const getQueueMetricsData = async (baseUrl : string) => {
    const queueMetricsUrl = baseUrl + "connect/GetCurrentMetricData?queueIds=fe0bd989-c3d1-4959-a47c-b7d27def9a99,f617a7d6-2be6-4f9b-b365-600fd3fc8646,4948d5e2-1434-44dd-a78f-37cbeb96d1d9,46bf33f7-3381-4db1-a3f7-85eafdf04578";
    
    const response = await fetch(queueMetricsUrl);
    if (!response.ok) {
        throw new Error("Error getting the queue metrics")
    }
    const res = await response.json(); // Parses the JSON response
    return res.data;
}

const listUsers = async(baseUrl : string) => {
    const listUsersUrl = baseUrl + "connect/ListUsersByRoutingProfile";

    const response = await fetch(listUsersUrl);
    if (!response.ok) {
        throw new Error("Error fetching users");
    }
    const res = await response.json(); // Parses the JSON response
    return res.data.UserDataList;
}

const setRoutingProfile = async (baseUrl: string, agentId: string, routingProfileId: string) => {
    const setRoutingProfileUrl = baseUrl + "connect/UpdateUserRoutingProfile";

    const reqBody = {
        "userId": agentId,
        "routingProfileId": routingProfileId
    }

    const response = await fetch(setRoutingProfileUrl, {
        method: 'PUT',
        body: JSON.stringify(reqBody) 
    });
    if (!response.ok) {
        throw new Error("Error updating routing profiles")
    }
}

export async function PATCH(request: any) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    try {
        // get the queue information
        const queueMetricsData = await getQueueMetricsData(baseUrl as string);
    
        // get a list of the agents
        const agents = await listUsers(baseUrl as string);
        
        // get the active agents
        const activeAgents = agents.filter((agent: any) => agent.Status.StatusName === "Available")
    
        // get the total nomber of contacts in queue for all queues
        const totalUsersInQueue = queueMetricsData.reduce((sum : number, queue : any) => sum + queue.queue_metrics[2].Value, 0);
    
        // if the number of active agents is greater than the number of users then set all of the agents to equal priority routing profile
        let message: string;
        if (activeAgents.length >= totalUsersInQueue) {
            message = "The number of active agents is bigger than the customers in the queue, assigning all active agents to the equal priority routing profile.";
            activeAgents.forEach((agent: any) => setRoutingProfile(baseUrl as string, agent.User.Id, equalPriorityRoutingProfile));
        } else {
            // assign priority equal to the ratio for each of the channels occupancy
            console.log("ALSÑDJKFLÑAJSDFLÑAJKSDLFJALSJDFAL -> here 1");

            let agentsAssigned = 0;

            message = "Assigned agents to queues based on occupancy ratio: "

            queueMetricsData.forEach((queue: any) => {
                // Use the occupancyRatio to assign priority
                const occupancyRatio = queue.queue_metrics[2].Value / totalUsersInQueue;
                const agentsToAssign = Math.floor(occupancyRatio * activeAgents.length);

                message = message + "Assigned " + agentsToAssign + " agents to queue " + queue.queue + ". "; 

                // Assign the agents to the routing profile
                for (let i = 0; i < agentsToAssign; i++) {
                    setRoutingProfile(baseUrl as string, activeAgents[agentsAssigned].User.Id, queueIdToRoutingProfile[queue.queue]);
                    agentsAssigned++;
                }
            });



            message = message + "Assigned the remaining " + (activeAgents.length - agentsAssigned) + " agents to the equal priority routing profile. ";
            // since we are rounding down, assign the remaining agents to the equal priority routing profile
            for (let i = agentsAssigned; i < activeAgents.length; i++) {
                setRoutingProfile(baseUrl as string, activeAgents[i].User.Id, equalPriorityRoutingProfile);
            }
        }
    
        return Response.json({
            "message": message,
            "number of active agents": activeAgents.length
        }, {
            status: 200,
        });

    } catch (error) {
        return new Response(JSON.stringify({
            "message": (error as Error).message,
        }), {
            status: 500,
        });
    }
}