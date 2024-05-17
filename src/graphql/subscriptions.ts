/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
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
export const onCreateContact = /* GraphQL */ `
  subscription OnCreateContact($filter: ModelSubscriptionContactFilterInput) {
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
export const onUpdateContact = /* GraphQL */ `
  subscription OnUpdateContact($filter: ModelSubscriptionContactFilterInput) {
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
export const onDeleteContact = /* GraphQL */ `
  subscription OnDeleteContact($filter: ModelSubscriptionContactFilterInput) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onCreateNotification(filter: $filter) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onUpdateNotification(filter: $filter) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onDeleteNotification(filter: $filter) {
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
