/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getSupervisor = /* GraphQL */ `query GetSupervisor($id: ID!) {
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
` as GeneratedQuery<
  APITypes.GetSupervisorQueryVariables,
  APITypes.GetSupervisorQuery
>;
export const listSupervisors = /* GraphQL */ `query ListSupervisors(
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
` as GeneratedQuery<
  APITypes.ListSupervisorsQueryVariables,
  APITypes.ListSupervisorsQuery
>;
export const getAgent = /* GraphQL */ `query GetAgent($id: ID!) {
  getAgent(id: $id) {
    name
    profilePic
    email
    needsHelp
    calls {
      nextToken
      __typename
    }
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetAgentQueryVariables, APITypes.GetAgentQuery>;
export const listAgents = /* GraphQL */ `query ListAgents(
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
` as GeneratedQuery<
  APITypes.ListAgentsQueryVariables,
  APITypes.ListAgentsQuery
>;
export const getCall = /* GraphQL */ `query GetCall($id: ID!) {
  getCall(id: $id) {
    ARN
    phone
    callStart
    callEnd
    agent {
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
    agentCallsId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCallQueryVariables, APITypes.GetCallQuery>;
export const listCalls = /* GraphQL */ `query ListCalls(
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
      agentCallsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListCallsQueryVariables, APITypes.ListCallsQuery>;
