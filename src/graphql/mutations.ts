/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createContact = /* GraphQL */ `
  mutation CreateContact(
    $input: CreateContactInput!
    $condition: ModelContactConditionInput
  ) {
    createContact(input: $input, condition: $condition) {
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
export const updateContact = /* GraphQL */ `
  mutation UpdateContact(
    $input: UpdateContactInput!
    $condition: ModelContactConditionInput
  ) {
    updateContact(input: $input, condition: $condition) {
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
export const deleteContact = /* GraphQL */ `
  mutation DeleteContact(
    $input: DeleteContactInput!
    $condition: ModelContactConditionInput
  ) {
    deleteContact(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
