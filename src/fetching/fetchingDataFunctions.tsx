import { generateClient } from 'aws-amplify/api';
import { getContact, listContacts, listUsers } from '@/graphql/queries';
import { GetContactQuery, ListContactsQuery, ListUsersQuery } from '@/API';

interface GQLResponse {
    data: GetContactQuery
}


export const fetchContactData = async (callId: string) => {
    const client = generateClient();

    const callData = await client.graphql({
        query: getContact,
        variables: {
            id: callId,
        },
    }) as GQLResponse;
    
    return callData.data.getContact;
    };

export const fetchAllContacts = async () => {
    const client = generateClient();

    try{

    const allCalls = await client.graphql({
        query: listContacts,
    }) as ListContactsQuery;

    console.log(allCalls);

    //@ts-ignore
    return allCalls.data.listContacts;

    } catch (error) {

        console.error(error);
    }
    
    }

    export const fetchAllUsers = async () => {
        const client = generateClient();
    
        try{    
            const allUsers = await client.graphql({
                query: listUsers,
            }) as ListUsersQuery;
    
        //@ts-ignore
        return allUsers.data.listUsers;
    
        } catch (error) {
    
            console.error(error);
        }
        
        }
    





// export const fetchAgentData = async (agentId: string) => {
//     const client = generateClient();

//     const agentData = await client.graphql({
//         query: getAgentData,
//         variables: {
//         id: agentId,
//         },
//     });
    
//     return agentData.data.getAgent;
//     }

