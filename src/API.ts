/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateSupervisorInput = {
  name: string,
  profilePic?: string | null,
  email: string,
  id?: string | null,
};

export type ModelSupervisorConditionInput = {
  name?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelSupervisorConditionInput | null > | null,
  or?: Array< ModelSupervisorConditionInput | null > | null,
  not?: ModelSupervisorConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Supervisor = {
  __typename: "Supervisor",
  name: string,
  profilePic?: string | null,
  email: string,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateSupervisorInput = {
  name?: string | null,
  profilePic?: string | null,
  email?: string | null,
  id: string,
};

export type DeleteSupervisorInput = {
  id: string,
};

export type CreateAgentInput = {
  name: string,
  profilePic?: string | null,
  email: string,
  needsHelp: boolean,
  id?: string | null,
};

export type ModelAgentConditionInput = {
  name?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  email?: ModelStringInput | null,
  needsHelp?: ModelBooleanInput | null,
  and?: Array< ModelAgentConditionInput | null > | null,
  or?: Array< ModelAgentConditionInput | null > | null,
  not?: ModelAgentConditionInput | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Agent = {
  __typename: "Agent",
  name: string,
  profilePic?: string | null,
  email: string,
  needsHelp: boolean,
  calls?: ModelCallConnection | null,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelCallConnection = {
  __typename: "ModelCallConnection",
  items:  Array<Call | null >,
  nextToken?: string | null,
};

export type Call = {
  __typename: "Call",
  ARN: string,
  phone: string,
  callStart: number,
  callEnd?: number | null,
  agent: Agent,
  id: string,
  createdAt: string,
  updatedAt: string,
  agentCallsId?: string | null,
};

export type UpdateAgentInput = {
  name?: string | null,
  profilePic?: string | null,
  email?: string | null,
  needsHelp?: boolean | null,
  id: string,
};

export type DeleteAgentInput = {
  id: string,
};

export type CreateCallInput = {
  ARN: string,
  phone: string,
  callStart: number,
  callEnd?: number | null,
  id?: string | null,
  agentCallsId?: string | null,
};

export type ModelCallConditionInput = {
  ARN?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  callStart?: ModelIntInput | null,
  callEnd?: ModelIntInput | null,
  and?: Array< ModelCallConditionInput | null > | null,
  or?: Array< ModelCallConditionInput | null > | null,
  not?: ModelCallConditionInput | null,
  agentCallsId?: ModelIDInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateCallInput = {
  ARN?: string | null,
  phone?: string | null,
  callStart?: number | null,
  callEnd?: number | null,
  id: string,
  agentCallsId?: string | null,
};

export type DeleteCallInput = {
  id: string,
};

export type ModelSupervisorFilterInput = {
  name?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelSupervisorFilterInput | null > | null,
  or?: Array< ModelSupervisorFilterInput | null > | null,
  not?: ModelSupervisorFilterInput | null,
};

export type ModelSupervisorConnection = {
  __typename: "ModelSupervisorConnection",
  items:  Array<Supervisor | null >,
  nextToken?: string | null,
};

export type ModelAgentFilterInput = {
  name?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  email?: ModelStringInput | null,
  needsHelp?: ModelBooleanInput | null,
  and?: Array< ModelAgentFilterInput | null > | null,
  or?: Array< ModelAgentFilterInput | null > | null,
  not?: ModelAgentFilterInput | null,
};

export type ModelAgentConnection = {
  __typename: "ModelAgentConnection",
  items:  Array<Agent | null >,
  nextToken?: string | null,
};

export type ModelCallFilterInput = {
  ARN?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  callStart?: ModelIntInput | null,
  callEnd?: ModelIntInput | null,
  and?: Array< ModelCallFilterInput | null > | null,
  or?: Array< ModelCallFilterInput | null > | null,
  not?: ModelCallFilterInput | null,
  agentCallsId?: ModelIDInput | null,
};

export type ModelSubscriptionSupervisorFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  profilePic?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionSupervisorFilterInput | null > | null,
  or?: Array< ModelSubscriptionSupervisorFilterInput | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionAgentFilterInput = {
  name?: ModelSubscriptionStringInput | null,
  profilePic?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  needsHelp?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionAgentFilterInput | null > | null,
  or?: Array< ModelSubscriptionAgentFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionCallFilterInput = {
  ARN?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  callStart?: ModelSubscriptionIntInput | null,
  callEnd?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionCallFilterInput | null > | null,
  or?: Array< ModelSubscriptionCallFilterInput | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateSupervisorMutationVariables = {
  input: CreateSupervisorInput,
  condition?: ModelSupervisorConditionInput | null,
};

export type CreateSupervisorMutation = {
  createSupervisor?:  {
    __typename: "Supervisor",
    name: string,
    profilePic?: string | null,
    email: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateSupervisorMutationVariables = {
  input: UpdateSupervisorInput,
  condition?: ModelSupervisorConditionInput | null,
};

export type UpdateSupervisorMutation = {
  updateSupervisor?:  {
    __typename: "Supervisor",
    name: string,
    profilePic?: string | null,
    email: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteSupervisorMutationVariables = {
  input: DeleteSupervisorInput,
  condition?: ModelSupervisorConditionInput | null,
};

export type DeleteSupervisorMutation = {
  deleteSupervisor?:  {
    __typename: "Supervisor",
    name: string,
    profilePic?: string | null,
    email: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateAgentMutationVariables = {
  input: CreateAgentInput,
  condition?: ModelAgentConditionInput | null,
};

export type CreateAgentMutation = {
  createAgent?:  {
    __typename: "Agent",
    name: string,
    profilePic?: string | null,
    email: string,
    needsHelp: boolean,
    calls?:  {
      __typename: "ModelCallConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAgentMutationVariables = {
  input: UpdateAgentInput,
  condition?: ModelAgentConditionInput | null,
};

export type UpdateAgentMutation = {
  updateAgent?:  {
    __typename: "Agent",
    name: string,
    profilePic?: string | null,
    email: string,
    needsHelp: boolean,
    calls?:  {
      __typename: "ModelCallConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAgentMutationVariables = {
  input: DeleteAgentInput,
  condition?: ModelAgentConditionInput | null,
};

export type DeleteAgentMutation = {
  deleteAgent?:  {
    __typename: "Agent",
    name: string,
    profilePic?: string | null,
    email: string,
    needsHelp: boolean,
    calls?:  {
      __typename: "ModelCallConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCallMutationVariables = {
  input: CreateCallInput,
  condition?: ModelCallConditionInput | null,
};

export type CreateCallMutation = {
  createCall?:  {
    __typename: "Call",
    ARN: string,
    phone: string,
    callStart: number,
    callEnd?: number | null,
    agent:  {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    agentCallsId?: string | null,
  } | null,
};

export type UpdateCallMutationVariables = {
  input: UpdateCallInput,
  condition?: ModelCallConditionInput | null,
};

export type UpdateCallMutation = {
  updateCall?:  {
    __typename: "Call",
    ARN: string,
    phone: string,
    callStart: number,
    callEnd?: number | null,
    agent:  {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    agentCallsId?: string | null,
  } | null,
};

export type DeleteCallMutationVariables = {
  input: DeleteCallInput,
  condition?: ModelCallConditionInput | null,
};

export type DeleteCallMutation = {
  deleteCall?:  {
    __typename: "Call",
    ARN: string,
    phone: string,
    callStart: number,
    callEnd?: number | null,
    agent:  {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    agentCallsId?: string | null,
  } | null,
};

export type GetSupervisorQueryVariables = {
  id: string,
};

export type GetSupervisorQuery = {
  getSupervisor?:  {
    __typename: "Supervisor",
    name: string,
    profilePic?: string | null,
    email: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListSupervisorsQueryVariables = {
  filter?: ModelSupervisorFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSupervisorsQuery = {
  listSupervisors?:  {
    __typename: "ModelSupervisorConnection",
    items:  Array< {
      __typename: "Supervisor",
      name: string,
      profilePic?: string | null,
      email: string,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAgentQueryVariables = {
  id: string,
};

export type GetAgentQuery = {
  getAgent?:  {
    __typename: "Agent",
    name: string,
    profilePic?: string | null,
    email: string,
    needsHelp: boolean,
    calls?:  {
      __typename: "ModelCallConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAgentsQueryVariables = {
  filter?: ModelAgentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAgentsQuery = {
  listAgents?:  {
    __typename: "ModelAgentConnection",
    items:  Array< {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCallQueryVariables = {
  id: string,
};

export type GetCallQuery = {
  getCall?:  {
    __typename: "Call",
    ARN: string,
    phone: string,
    callStart: number,
    callEnd?: number | null,
    agent:  {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    agentCallsId?: string | null,
  } | null,
};

export type ListCallsQueryVariables = {
  filter?: ModelCallFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCallsQuery = {
  listCalls?:  {
    __typename: "ModelCallConnection",
    items:  Array< {
      __typename: "Call",
      ARN: string,
      phone: string,
      callStart: number,
      callEnd?: number | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      agentCallsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateSupervisorSubscriptionVariables = {
  filter?: ModelSubscriptionSupervisorFilterInput | null,
};

export type OnCreateSupervisorSubscription = {
  onCreateSupervisor?:  {
    __typename: "Supervisor",
    name: string,
    profilePic?: string | null,
    email: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateSupervisorSubscriptionVariables = {
  filter?: ModelSubscriptionSupervisorFilterInput | null,
};

export type OnUpdateSupervisorSubscription = {
  onUpdateSupervisor?:  {
    __typename: "Supervisor",
    name: string,
    profilePic?: string | null,
    email: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteSupervisorSubscriptionVariables = {
  filter?: ModelSubscriptionSupervisorFilterInput | null,
};

export type OnDeleteSupervisorSubscription = {
  onDeleteSupervisor?:  {
    __typename: "Supervisor",
    name: string,
    profilePic?: string | null,
    email: string,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateAgentSubscriptionVariables = {
  filter?: ModelSubscriptionAgentFilterInput | null,
};

export type OnCreateAgentSubscription = {
  onCreateAgent?:  {
    __typename: "Agent",
    name: string,
    profilePic?: string | null,
    email: string,
    needsHelp: boolean,
    calls?:  {
      __typename: "ModelCallConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAgentSubscriptionVariables = {
  filter?: ModelSubscriptionAgentFilterInput | null,
};

export type OnUpdateAgentSubscription = {
  onUpdateAgent?:  {
    __typename: "Agent",
    name: string,
    profilePic?: string | null,
    email: string,
    needsHelp: boolean,
    calls?:  {
      __typename: "ModelCallConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAgentSubscriptionVariables = {
  filter?: ModelSubscriptionAgentFilterInput | null,
};

export type OnDeleteAgentSubscription = {
  onDeleteAgent?:  {
    __typename: "Agent",
    name: string,
    profilePic?: string | null,
    email: string,
    needsHelp: boolean,
    calls?:  {
      __typename: "ModelCallConnection",
      nextToken?: string | null,
    } | null,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCallSubscriptionVariables = {
  filter?: ModelSubscriptionCallFilterInput | null,
};

export type OnCreateCallSubscription = {
  onCreateCall?:  {
    __typename: "Call",
    ARN: string,
    phone: string,
    callStart: number,
    callEnd?: number | null,
    agent:  {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    agentCallsId?: string | null,
  } | null,
};

export type OnUpdateCallSubscriptionVariables = {
  filter?: ModelSubscriptionCallFilterInput | null,
};

export type OnUpdateCallSubscription = {
  onUpdateCall?:  {
    __typename: "Call",
    ARN: string,
    phone: string,
    callStart: number,
    callEnd?: number | null,
    agent:  {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    agentCallsId?: string | null,
  } | null,
};

export type OnDeleteCallSubscriptionVariables = {
  filter?: ModelSubscriptionCallFilterInput | null,
};

export type OnDeleteCallSubscription = {
  onDeleteCall?:  {
    __typename: "Call",
    ARN: string,
    phone: string,
    callStart: number,
    callEnd?: number | null,
    agent:  {
      __typename: "Agent",
      name: string,
      profilePic?: string | null,
      email: string,
      needsHelp: boolean,
      id: string,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    agentCallsId?: string | null,
  } | null,
};
