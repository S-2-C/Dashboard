/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSupervisor = /* GraphQL */ `
  query GetSupervisor($id: ID!) {
    getSupervisor(id: $id) {
      name
      profilePic
      email
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listSupervisors = /* GraphQL */ `
  query ListSupervisors(
    $filter: ModelSupervisorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSupervisors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        profilePic
        email
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getAgent = /* GraphQL */ `
  query GetAgent($id: ID!) {
    getAgent(id: $id) {
      name
      profilePic
      email
      needsHelp
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listAgents = /* GraphQL */ `
  query ListAgents(
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        name
        profilePic
        email
        needsHelp
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCall = /* GraphQL */ `
  query GetCall($id: ID!) {
    getCall(id: $id) {
      ARN
      phone
      callStart
      callEnd
      agentId {
        name
        profilePic
        email
        needsHelp
        id
        createdAt
        updatedAt
        __typename
      }
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCalls = /* GraphQL */ `
  query ListCalls(
    $filter: ModelCallFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCalls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ARN
        phone
        callStart
        callEnd
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
