/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateSupervisor = /* GraphQL */ `subscription OnCreateSupervisor(
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
` as GeneratedSubscription<
  APITypes.OnCreateSupervisorSubscriptionVariables,
  APITypes.OnCreateSupervisorSubscription
>;
export const onUpdateSupervisor = /* GraphQL */ `subscription OnUpdateSupervisor(
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
` as GeneratedSubscription<
  APITypes.OnUpdateSupervisorSubscriptionVariables,
  APITypes.OnUpdateSupervisorSubscription
>;
export const onDeleteSupervisor = /* GraphQL */ `subscription OnDeleteSupervisor(
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
` as GeneratedSubscription<
  APITypes.OnDeleteSupervisorSubscriptionVariables,
  APITypes.OnDeleteSupervisorSubscription
>;
export const onCreateAgent = /* GraphQL */ `subscription OnCreateAgent($filter: ModelSubscriptionAgentFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAgentSubscriptionVariables,
  APITypes.OnCreateAgentSubscription
>;
export const onUpdateAgent = /* GraphQL */ `subscription OnUpdateAgent($filter: ModelSubscriptionAgentFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAgentSubscriptionVariables,
  APITypes.OnUpdateAgentSubscription
>;
export const onDeleteAgent = /* GraphQL */ `subscription OnDeleteAgent($filter: ModelSubscriptionAgentFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAgentSubscriptionVariables,
  APITypes.OnDeleteAgentSubscription
>;
export const onCreateCall = /* GraphQL */ `subscription OnCreateCall($filter: ModelSubscriptionCallFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCallSubscriptionVariables,
  APITypes.OnCreateCallSubscription
>;
export const onUpdateCall = /* GraphQL */ `subscription OnUpdateCall($filter: ModelSubscriptionCallFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCallSubscriptionVariables,
  APITypes.OnUpdateCallSubscription
>;
export const onDeleteCall = /* GraphQL */ `subscription OnDeleteCall($filter: ModelSubscriptionCallFilterInput) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCallSubscriptionVariables,
  APITypes.OnDeleteCallSubscription
>;
