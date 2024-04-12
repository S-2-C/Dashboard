/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateSupervisor = /* GraphQL */ `
  subscription OnCreateSupervisor(
    $filter: ModelSubscriptionSupervisorFilterInput
  ) {
    onCreateSupervisor(filter: $filter) {
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
export const onUpdateSupervisor = /* GraphQL */ `
  subscription OnUpdateSupervisor(
    $filter: ModelSubscriptionSupervisorFilterInput
  ) {
    onUpdateSupervisor(filter: $filter) {
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
export const onDeleteSupervisor = /* GraphQL */ `
  subscription OnDeleteSupervisor(
    $filter: ModelSubscriptionSupervisorFilterInput
  ) {
    onDeleteSupervisor(filter: $filter) {
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
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent($filter: ModelSubscriptionAgentFilterInput) {
    onCreateAgent(filter: $filter) {
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
`;
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent($filter: ModelSubscriptionAgentFilterInput) {
    onUpdateAgent(filter: $filter) {
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
`;
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent($filter: ModelSubscriptionAgentFilterInput) {
    onDeleteAgent(filter: $filter) {
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
`;
export const onCreateCall = /* GraphQL */ `
  subscription OnCreateCall($filter: ModelSubscriptionCallFilterInput) {
    onCreateCall(filter: $filter) {
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
`;
export const onUpdateCall = /* GraphQL */ `
  subscription OnUpdateCall($filter: ModelSubscriptionCallFilterInput) {
    onUpdateCall(filter: $filter) {
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
`;
export const onDeleteCall = /* GraphQL */ `
  subscription OnDeleteCall($filter: ModelSubscriptionCallFilterInput) {
    onDeleteCall(filter: $filter) {
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
`;
