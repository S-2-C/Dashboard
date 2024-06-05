/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
    id
    arn
    name
    profilePic
    role
    needsHelp
    isOnCall
    Contacts {
      items {
        phone
        callStart
        callEnd
        user {
          id
          arn
          name
          profilePic
          role
          needsHelp
          isOnCall
          Contacts {
            items {
              phone
              callStart
              callEnd
              user {
                id
                arn
                name
                profilePic
                role
                needsHelp
                isOnCall
                createdAt
                updatedAt
                __typename
              }
              id
              createdAt
              updatedAt
              userContactsId
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        id
        createdAt
        updatedAt
        userContactsId
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
    id
    arn
    name
    profilePic
    role
    needsHelp
    isOnCall
    Contacts {
      items {
        phone
        callStart
        callEnd
        user {
          id
          arn
          name
          profilePic
          role
          needsHelp
          isOnCall
          Contacts {
            items {
              phone
              callStart
              callEnd
              user {
                id
                arn
                name
                profilePic
                role
                needsHelp
                isOnCall
                createdAt
                updatedAt
                __typename
              }
              id
              createdAt
              updatedAt
              userContactsId
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        id
        createdAt
        updatedAt
        userContactsId
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
    id
    arn
    name
    profilePic
    role
    needsHelp
    isOnCall
    Contacts {
      items {
        phone
        callStart
        callEnd
        user {
          id
          arn
          name
          profilePic
          role
          needsHelp
          isOnCall
          Contacts {
            items {
              phone
              callStart
              callEnd
              user {
                id
                arn
                name
                profilePic
                role
                needsHelp
                isOnCall
                createdAt
                updatedAt
                __typename
              }
              id
              createdAt
              updatedAt
              userContactsId
              __typename
            }
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        id
        createdAt
        updatedAt
        userContactsId
        __typename
      }
      nextToken
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateContact = /* GraphQL */ `subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
  onCreateContact(filter: $filter) {
    phone
    callStart
    callEnd
    user {
      id
      arn
      name
      profilePic
      role
      needsHelp
      isOnCall
      Contacts {
        items {
          phone
          callStart
          callEnd
          user {
            id
            arn
            name
            profilePic
            role
            needsHelp
            isOnCall
            Contacts {
              items {
                phone
                callStart
                callEnd
                id
                createdAt
                updatedAt
                userContactsId
                __typename
              }
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          id
          createdAt
          updatedAt
          userContactsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    id
    createdAt
    updatedAt
    userContactsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateContactSubscriptionVariables,
  APITypes.OnCreateContactSubscription
>;
export const onUpdateContact = /* GraphQL */ `subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
  onUpdateContact(filter: $filter) {
    phone
    callStart
    callEnd
    user {
      id
      arn
      name
      profilePic
      role
      needsHelp
      isOnCall
      Contacts {
        items {
          phone
          callStart
          callEnd
          user {
            id
            arn
            name
            profilePic
            role
            needsHelp
            isOnCall
            Contacts {
              items {
                phone
                callStart
                callEnd
                id
                createdAt
                updatedAt
                userContactsId
                __typename
              }
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          id
          createdAt
          updatedAt
          userContactsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    id
    createdAt
    updatedAt
    userContactsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateContactSubscriptionVariables,
  APITypes.OnUpdateContactSubscription
>;
export const onDeleteContact = /* GraphQL */ `subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
  onDeleteContact(filter: $filter) {
    phone
    callStart
    callEnd
    user {
      id
      arn
      name
      profilePic
      role
      needsHelp
      isOnCall
      Contacts {
        items {
          phone
          callStart
          callEnd
          user {
            id
            arn
            name
            profilePic
            role
            needsHelp
            isOnCall
            Contacts {
              items {
                phone
                callStart
                callEnd
                id
                createdAt
                updatedAt
                userContactsId
                __typename
              }
              nextToken
              __typename
            }
            createdAt
            updatedAt
            __typename
          }
          id
          createdAt
          updatedAt
          userContactsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
    id
    createdAt
    updatedAt
    userContactsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteContactSubscriptionVariables,
  APITypes.OnDeleteContactSubscription
>;
export const onCreateNotification = /* GraphQL */ `subscription OnCreateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onCreateNotification(filter: $filter) {
    rule
    action
    description
    urgency
    timestamp
    agentEmail
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateNotificationSubscriptionVariables,
  APITypes.OnCreateNotificationSubscription
>;
export const onUpdateNotification = /* GraphQL */ `subscription OnUpdateNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onUpdateNotification(filter: $filter) {
    rule
    action
    description
    urgency
    timestamp
    agentEmail
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateNotificationSubscriptionVariables,
  APITypes.OnUpdateNotificationSubscription
>;
export const onDeleteNotification = /* GraphQL */ `subscription OnDeleteNotification(
  $filter: ModelSubscriptionNotificationFilterInput
) {
  onDeleteNotification(filter: $filter) {
    rule
    action
    description
    urgency
    timestamp
    agentEmail
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteNotificationSubscriptionVariables,
  APITypes.OnDeleteNotificationSubscription
>;
