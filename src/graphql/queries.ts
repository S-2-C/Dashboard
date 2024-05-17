/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
                }
                id
                createdAt
                updatedAt
                userContactsId
              }
              nextToken
            }
            createdAt
            updatedAt
          }
          id
          createdAt
          updatedAt
          userContactsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            id
            createdAt
            updatedAt
            userContactsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContact = /* GraphQL */ `
  query GetContact($id: ID!) {
    getContact(id: $id) {
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            id
            createdAt
            updatedAt
            userContactsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      id
      createdAt
      updatedAt
      userContactsId
    }
  }
`;
export const listContacts = /* GraphQL */ `
  query ListContacts(
    $filter: ModelContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
                Contacts {
                  nextToken
                }
                createdAt
                updatedAt
              }
              id
              createdAt
              updatedAt
              userContactsId
            }
            nextToken
          }
          createdAt
          updatedAt
        }
        id
        createdAt
        updatedAt
        userContactsId
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      rule
      action
      description
      urgency
      id
      createdAt
      updatedAt
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        rule
        action
        description
        urgency
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const usersByArn = /* GraphQL */ `
  query UsersByArn(
    $arn: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    usersByArn(
      arn: $arn
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
                }
                nextToken
              }
              createdAt
              updatedAt
            }
            id
            createdAt
            updatedAt
            userContactsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
