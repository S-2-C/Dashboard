import { generateClient } from "aws-amplify/api";

import {
  getContact,
  getUser,
  listContacts,
  listUsers,
} from "@/graphql/queries";
import {
  GetContactQuery,
  GetUserQuery,
  ListContactsQuery,
  ListUsersQuery,
} from "@/API";

interface GQLResponse {
  data: GetContactQuery;
}

export const fetchContactData = async (callId: string) => {
  const client = generateClient();

  const callData = (await client.graphql({
    query: getContact,
    variables: {
      id: callId,
    },
  })) as GQLResponse;

  return callData.data.getContact;
};

export const fetchOneAgent = async (agentId: string) => {
  const client = generateClient();

  // %40 is the URL encoded version of @, replace it with @
  if (agentId) agentId = agentId.replace("%40", "@");

  try {
    const agentData = (await client.graphql({
      query: getUser,
      variables: {
        id: agentId,
      },
    })) as GetUserQuery;

    //@ts-ignore
    return agentData.data.getUser;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllAgents = async () => {
  const client = generateClient();

  try {
    const allAgents = (await client.graphql({
      query: listUsers,
    })) as ListUsersQuery;

    //@ts-ignore
    return allAgents.data.listUsers;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllUsers = async () => {
  const client = generateClient();

  try {
    const allUsers = (await client.graphql({
      query: listUsers,
    })) as ListUsersQuery;

    //@ts-ignore
    return allUsers.data.listUsers;
  } catch (error) {
    console.error(error);
  }
};

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
