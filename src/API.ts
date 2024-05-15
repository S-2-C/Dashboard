/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  name?: string | null,
  profilePic?: string | null,
  role: Role,
  needsHelp: boolean,
};

export enum Role {
  AGENT = "AGENT",
  SUPERVISOR = "SUPERVISOR",
}


export type ModelUserConditionInput = {
  id?: ModelStringInput | null,
  name?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  role?: ModelRoleInput | null,
  needsHelp?: ModelBooleanInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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

export type ModelRoleInput = {
  eq?: Role | null,
  ne?: Role | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  name?: string | null,
  profilePic?: string | null,
  role: Role,
  needsHelp: boolean,
  Contacts?: ModelContactConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelContactConnection = {
  __typename: "ModelContactConnection",
  items:  Array<Contact | null >,
  nextToken?: string | null,
};

export type Contact = {
  __typename: "Contact",
  phone: string,
  callStart: string,
  callEnd?: string | null,
  user: User,
  id: string,
  createdAt: string,
  updatedAt: string,
  userContactsId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  profilePic?: string | null,
  role?: Role | null,
  needsHelp?: boolean | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateContactInput = {
  phone: string,
  callStart: string,
  callEnd?: string | null,
  id?: string | null,
  userContactsId?: string | null,
};

export type ModelContactConditionInput = {
  phone?: ModelStringInput | null,
  callStart?: ModelStringInput | null,
  callEnd?: ModelStringInput | null,
  and?: Array< ModelContactConditionInput | null > | null,
  or?: Array< ModelContactConditionInput | null > | null,
  not?: ModelContactConditionInput | null,
  userContactsId?: ModelIDInput | null,
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

export type UpdateContactInput = {
  phone?: string | null,
  callStart?: string | null,
  callEnd?: string | null,
  id: string,
  userContactsId?: string | null,
};

export type DeleteContactInput = {
  id: string,
};

export type CreateNotificationInput = {
  rule: string,
  action: string,
  description: string,
  urgency: Urgency,
  id?: string | null,
};

export enum Urgency {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  REGULAR = "REGULAR",
}


export type ModelNotificationConditionInput = {
  rule?: ModelStringInput | null,
  action?: ModelStringInput | null,
  description?: ModelStringInput | null,
  urgency?: ModelUrgencyInput | null,
  and?: Array< ModelNotificationConditionInput | null > | null,
  or?: Array< ModelNotificationConditionInput | null > | null,
  not?: ModelNotificationConditionInput | null,
};

export type ModelUrgencyInput = {
  eq?: Urgency | null,
  ne?: Urgency | null,
};

export type Notification = {
  __typename: "Notification",
  rule: string,
  action: string,
  description: string,
  urgency: Urgency,
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateNotificationInput = {
  rule?: string | null,
  action?: string | null,
  description?: string | null,
  urgency?: Urgency | null,
  id: string,
};

export type DeleteNotificationInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelStringInput | null,
  name?: ModelStringInput | null,
  profilePic?: ModelStringInput | null,
  role?: ModelRoleInput | null,
  needsHelp?: ModelBooleanInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelContactFilterInput = {
  phone?: ModelStringInput | null,
  callStart?: ModelStringInput | null,
  callEnd?: ModelStringInput | null,
  and?: Array< ModelContactFilterInput | null > | null,
  or?: Array< ModelContactFilterInput | null > | null,
  not?: ModelContactFilterInput | null,
  userContactsId?: ModelIDInput | null,
};

export type ModelNotificationFilterInput = {
  rule?: ModelStringInput | null,
  action?: ModelStringInput | null,
  description?: ModelStringInput | null,
  urgency?: ModelUrgencyInput | null,
  and?: Array< ModelNotificationFilterInput | null > | null,
  or?: Array< ModelNotificationFilterInput | null > | null,
  not?: ModelNotificationFilterInput | null,
};

export type ModelNotificationConnection = {
  __typename: "ModelNotificationConnection",
  items:  Array<Notification | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  profilePic?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  needsHelp?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
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

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionContactFilterInput = {
  phone?: ModelSubscriptionStringInput | null,
  callStart?: ModelSubscriptionStringInput | null,
  callEnd?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionContactFilterInput | null > | null,
  or?: Array< ModelSubscriptionContactFilterInput | null > | null,
};

export type ModelSubscriptionNotificationFilterInput = {
  rule?: ModelSubscriptionStringInput | null,
  action?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  urgency?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
  or?: Array< ModelSubscriptionNotificationFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    profilePic?: string | null,
    role: Role,
    needsHelp: boolean,
    Contacts?:  {
      __typename: "ModelContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    profilePic?: string | null,
    role: Role,
    needsHelp: boolean,
    Contacts?:  {
      __typename: "ModelContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    profilePic?: string | null,
    role: Role,
    needsHelp: boolean,
    Contacts?:  {
      __typename: "ModelContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateContactMutationVariables = {
  input: CreateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type CreateContactMutation = {
  createContact?:  {
    __typename: "Contact",
    phone: string,
    callStart: string,
    callEnd?: string | null,
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userContactsId?: string | null,
  } | null,
};

export type UpdateContactMutationVariables = {
  input: UpdateContactInput,
  condition?: ModelContactConditionInput | null,
};

export type UpdateContactMutation = {
  updateContact?:  {
    __typename: "Contact",
    phone: string,
    callStart: string,
    callEnd?: string | null,
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userContactsId?: string | null,
  } | null,
};

export type DeleteContactMutationVariables = {
  input: DeleteContactInput,
  condition?: ModelContactConditionInput | null,
};

export type DeleteContactMutation = {
  deleteContact?:  {
    __typename: "Contact",
    phone: string,
    callStart: string,
    callEnd?: string | null,
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userContactsId?: string | null,
  } | null,
};

export type CreateNotificationMutationVariables = {
  input: CreateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type CreateNotificationMutation = {
  createNotification?:  {
    __typename: "Notification",
    rule: string,
    action: string,
    description: string,
    urgency: Urgency,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateNotificationMutationVariables = {
  input: UpdateNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type UpdateNotificationMutation = {
  updateNotification?:  {
    __typename: "Notification",
    rule: string,
    action: string,
    description: string,
    urgency: Urgency,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteNotificationMutationVariables = {
  input: DeleteNotificationInput,
  condition?: ModelNotificationConditionInput | null,
};

export type DeleteNotificationMutation = {
  deleteNotification?:  {
    __typename: "Notification",
    rule: string,
    action: string,
    description: string,
    urgency: Urgency,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    profilePic?: string | null,
    role: Role,
    needsHelp: boolean,
    Contacts?:  {
      __typename: "ModelContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetContactQueryVariables = {
  id: string,
};

export type GetContactQuery = {
  getContact?:  {
    __typename: "Contact",
    phone: string,
    callStart: string,
    callEnd?: string | null,
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userContactsId?: string | null,
  } | null,
};

export type ListContactsQueryVariables = {
  filter?: ModelContactFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListContactsQuery = {
  listContacts?:  {
    __typename: "ModelContactConnection",
    items:  Array< {
      __typename: "Contact",
      phone: string,
      callStart: string,
      callEnd?: string | null,
      id: string,
      createdAt: string,
      updatedAt: string,
      userContactsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetNotificationQueryVariables = {
  id: string,
};

export type GetNotificationQuery = {
  getNotification?:  {
    __typename: "Notification",
    rule: string,
    action: string,
    description: string,
    urgency: Urgency,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListNotificationsQueryVariables = {
  filter?: ModelNotificationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListNotificationsQuery = {
  listNotifications?:  {
    __typename: "ModelNotificationConnection",
    items:  Array< {
      __typename: "Notification",
      rule: string,
      action: string,
      description: string,
      urgency: Urgency,
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    profilePic?: string | null,
    role: Role,
    needsHelp: boolean,
    Contacts?:  {
      __typename: "ModelContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    profilePic?: string | null,
    role: Role,
    needsHelp: boolean,
    Contacts?:  {
      __typename: "ModelContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name?: string | null,
    profilePic?: string | null,
    role: Role,
    needsHelp: boolean,
    Contacts?:  {
      __typename: "ModelContactConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnCreateContactSubscription = {
  onCreateContact?:  {
    __typename: "Contact",
    phone: string,
    callStart: string,
    callEnd?: string | null,
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userContactsId?: string | null,
  } | null,
};

export type OnUpdateContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnUpdateContactSubscription = {
  onUpdateContact?:  {
    __typename: "Contact",
    phone: string,
    callStart: string,
    callEnd?: string | null,
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userContactsId?: string | null,
  } | null,
};

export type OnDeleteContactSubscriptionVariables = {
  filter?: ModelSubscriptionContactFilterInput | null,
};

export type OnDeleteContactSubscription = {
  onDeleteContact?:  {
    __typename: "Contact",
    phone: string,
    callStart: string,
    callEnd?: string | null,
    user:  {
      __typename: "User",
      id: string,
      name?: string | null,
      profilePic?: string | null,
      role: Role,
      needsHelp: boolean,
      createdAt: string,
      updatedAt: string,
    },
    id: string,
    createdAt: string,
    updatedAt: string,
    userContactsId?: string | null,
  } | null,
};

export type OnCreateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnCreateNotificationSubscription = {
  onCreateNotification?:  {
    __typename: "Notification",
    rule: string,
    action: string,
    description: string,
    urgency: Urgency,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnUpdateNotificationSubscription = {
  onUpdateNotification?:  {
    __typename: "Notification",
    rule: string,
    action: string,
    description: string,
    urgency: Urgency,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteNotificationSubscriptionVariables = {
  filter?: ModelSubscriptionNotificationFilterInput | null,
};

export type OnDeleteNotificationSubscription = {
  onDeleteNotification?:  {
    __typename: "Notification",
    rule: string,
    action: string,
    description: string,
    urgency: Urgency,
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
