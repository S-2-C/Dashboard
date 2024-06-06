import { ConnectClient, ListUsersCommand, ListUsersCommandOutput, UserSummary, UpdateUserRoutingProfileCommand, } from "@aws-sdk/client-connect";
import { make_config_json } from "@/app/apis_library/connect";

const getQueueMetricsData = async (baseUrl : string) => {
    // const queueMetricsUrl = baseUrl + "connect/GetCurrentMetricData?queueIds=fe0bd989-c3d1-4959-a47c-b7d27def9a99,f617a7d6-2be6-4f9b-b365-600fd3fc8646,4948d5e2-1434-44dd-a78f-37cbeb96d1d9,46bf33f7-3381-4db1-a3f7-85eafdf04578";
    // try {
    //     const response = await fetch(queueMetricsUrl);
    //     if (!response.ok) {
    //         return Response.json({
    //             "message": "Error fetching metric data",
    //         }, {
    //             status: 500,
    //         });
    //     }
    //     const res = await response.json(); // Parses the JSON response
    //     return res.data;
    // } catch (error) {
    //     return Response.json({
    //         "message": "Error parsing metric data",
    //     }, {
    //         status: 500,
    //     });
    // }
    return [
        {
            "queue": "46bf33f7-3381-4db1-a3f7-85eafdf04578",
            "queue_metrics": [
                {
                    "Metric": "AGENTS_AVAILABLE",
                    "Value": 0
                },
                {
                    "Metric": "AGENTS_ON_CALL",
                    "Value": 0
                },
                {
                    "Metric": "CONTACTS_IN_QUEUE",
                    "Value": 2
                }
            ]
        },
        {
            "queue": "f617a7d6-2be6-4f9b-b365-600fd3fc8646",
            "queue_metrics": [
                {
                    "Metric": "AGENTS_AVAILABLE",
                    "Value": 0
                },
                {
                    "Metric": "AGENTS_ON_CALL",
                    "Value": 0
                },
                {
                    "Metric": "CONTACTS_IN_QUEUE",
                    "Value": 1
                }
            ]
        },
        {
            "queue": "4948d5e2-1434-44dd-a78f-37cbeb96d1d9",
            "queue_metrics": [
                {
                    "Metric": "AGENTS_AVAILABLE",
                    "Value": 0
                },
                {
                    "Metric": "AGENTS_ON_CALL",
                    "Value": 0
                },
                {
                    "Metric": "CONTACTS_IN_QUEUE",
                    "Value": 3
                }
            ]
        },
        {
            "queue": "fe0bd989-c3d1-4959-a47c-b7d27def9a99",
            "queue_metrics": [
                {
                    "Metric": "AGENTS_AVAILABLE",
                    "Value": 0
                },
                {
                    "Metric": "AGENTS_ON_CALL",
                    "Value": 0
                },
                {
                    "Metric": "CONTACTS_IN_QUEUE",
                    "Value": 0
                }
            ]
        }
    ]
}

const listUsers = async(baseUrl : string) => {
    const listUsersUrl = baseUrl + "connect/ListUsers";
    try {
        const response = await fetch(listUsersUrl);
        if (!response.ok) {
            return Response.json({
                "message": "Error fetching users",
            }, {
                status: 500,
            });
        }
        const res = await response.json(); // Parses the JSON response
        return res.data;
    } catch (error) {
        return Response.json({
            "message": "Error parsing users",
        }, {
            status: 500,
        });
    }
}

export async function PATCH(request: any) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    // get the queue information
    const queueMetricsData = await getQueueMetricsData(baseUrl as string);

    // list the users
    const users = await listUsers(baseUrl as string);
    

    // get the total nomber of contacts in queue for all queues
    const totalUsersInQueue = queueMetricsData.reduce((sum : number, queue : any) => sum + queue.queue_metrics[2].Value, 0);

    return Response.json({
        "message": "Updated routing profiles based on queue metrics",
        "totalUsersInQueue": totalUsersInQueue
    }, {
        status: 200,
    });
}