/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createSupervisor = /* GraphQL */ `mutation CreateSupervisor(
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
` as GeneratedMutation<
  APITypes.CreateSupervisorMutationVariables,
  APITypes.CreateSupervisorMutation
>;
export const updateSupervisor = /* GraphQL */ `mutation UpdateSupervisor(
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
` as GeneratedMutation<
  APITypes.UpdateSupervisorMutationVariables,
  APITypes.UpdateSupervisorMutation
>;
export const deleteSupervisor = /* GraphQL */ `mutation DeleteSupervisor(
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
` as GeneratedMutation<
  APITypes.DeleteSupervisorMutationVariables,
  APITypes.DeleteSupervisorMutation
>;
export const createAgent = /* GraphQL */ `mutation CreateAgent(
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
` as GeneratedMutation<
  APITypes.CreateAgentMutationVariables,
  APITypes.CreateAgentMutation
>;
export const updateAgent = /* GraphQL */ `mutation UpdateAgent(
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
` as GeneratedMutation<
  APITypes.UpdateAgentMutationVariables,
  APITypes.UpdateAgentMutation
>;
export const deleteAgent = /* GraphQL */ `mutation DeleteAgent(
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
` as GeneratedMutation<
  APITypes.DeleteAgentMutationVariables,
  APITypes.DeleteAgentMutation
>;
export const createCall = /* GraphQL */ `mutation CreateCall(
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
` as GeneratedMutation<
  APITypes.CreateCallMutationVariables,
  APITypes.CreateCallMutation
>;
export const updateCall = /* GraphQL */ `mutation UpdateCall(
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
` as GeneratedMutation<
  APITypes.UpdateCallMutationVariables,
  APITypes.UpdateCallMutation
>;
export const deleteCall = /* GraphQL */ `mutation DeleteCall(
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
` as GeneratedMutation<
  APITypes.DeleteCallMutationVariables,
  APITypes.DeleteCallMutation
>;
