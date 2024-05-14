/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSupervisor = /* GraphQL */ `
  mutation CreateSupervisor(
    $input: CreateSupervisorInput!
    $condition: ModelSupervisorConditionInput
  ) {
    createSupervisor(input: $input, condition: $condition) {
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
export const updateSupervisor = /* GraphQL */ `
  mutation UpdateSupervisor(
    $input: UpdateSupervisorInput!
    $condition: ModelSupervisorConditionInput
  ) {
    updateSupervisor(input: $input, condition: $condition) {
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
export const deleteSupervisor = /* GraphQL */ `
  mutation DeleteSupervisor(
    $input: DeleteSupervisorInput!
    $condition: ModelSupervisorConditionInput
  ) {
    deleteSupervisor(input: $input, condition: $condition) {
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
export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
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
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
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
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
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
export const createCall = /* GraphQL */ `
  mutation CreateCall(
    $input: CreateCallInput!
    $condition: ModelCallConditionInput
  ) {
    createCall(input: $input, condition: $condition) {
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
export const updateCall = /* GraphQL */ `
  mutation UpdateCall(
    $input: UpdateCallInput!
    $condition: ModelCallConditionInput
  ) {
    updateCall(input: $input, condition: $condition) {
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
export const deleteCall = /* GraphQL */ `
  mutation DeleteCall(
    $input: DeleteCallInput!
    $condition: ModelCallConditionInput
  ) {
    deleteCall(input: $input, condition: $condition) {
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
