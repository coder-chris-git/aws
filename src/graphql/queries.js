/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserModel = /* GraphQL */ `
  query GetUserModel($username: String!) {
    getUserModel(username: $username) {
      username
      email
    }
  }
`;
export const listUserModels = /* GraphQL */ `
  query ListUserModels(
    $filter: TableUserModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        username
        email
      }
      nextToken
    }
  }
`;
