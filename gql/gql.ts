/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  '\n  query getGeneral {\n    general {\n      data {\n        attributes {\n          title\n        }\n      }\n    }\n  }\n': types.GetGeneralDocument,
  '\n    mutation createRestaurant($name: String!, $description: String!, $url: String!){\n        createRestaurant(data:{name:$name, description: $description, url: $url, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    name\n                    description\n                    url\n                }\n            }\n        }\n    } \n':
    types.CreateRestaurantDocument,
  '\n  mutation updateRestaurant($id: ID!, $name: String, $description: String, $url: String) {\n    updateRestaurant(id: $id, data: { name: $name, description: $description, url: $url }) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n':
    types.UpdateRestaurantDocument,
  '\n  query getRestaurants($from: Int!, $toGet: Int!) {\n    restaurants(pagination: { start: $from, limit: $toGet }) {\n      meta {\n        pagination {\n          pageCount\n        }\n      }\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n':
    types.GetRestaurantsDocument,
  '\n  mutation deleteRestaurant($id: ID!) {\n    deleteRestaurant(id: $id) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n':
    types.DeleteRestaurantDocument,
  '\n  query getRestaurantById($restaurantId: ID!) {\n    restaurant(id: $restaurantId) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n':
    types.GetRestaurantByIdDocument,
  '\n    mutation createAppUser($userId: String!, $email: String, $userName:String $imageUrl: String){\n        createAppUser(data:{userId: $userId, email:$email, userName:$userName, imageUrl: $imageUrl, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    email\n                    imageUrl\n                    userId\n                    userName\n                }\n            }\n        }\n    } \n':
    types.CreateAppUserDocument,
  '\n  query getAppUsers($userId: String!) {\n    appUsers(filters: { userId: { eq: $userId } }) {\n      data {\n        id\n        attributes {\n          email\n          userName\n          imageUrl\n          userId\n        }\n      }\n    }\n  }\n':
    types.GetAppUsersDocument,
  '\n  mutation createVote($userId: String!, $restaurantId: String!){\n    createVote(data:{userId:$userId, restaurantId: $restaurantId, publishedAt: ""}){\n      data{\n        id\n        attributes{\n          userId\n          restaurantId\n        }\n      }\n    }\n  } \n':
    types.CreateVoteDocument,
  '\n  query getVotes {\n    votes {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n':
    types.GetVotesDocument,
  '\n  query getRestaurantVote($restaurantId: String!) {\n    votes(filters: { restaurantId: { eq: $restaurantId } }, sort: "createdAt:desc") {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n':
    types.GetRestaurantVoteDocument,
  '\n  mutation deleteVote($id: ID!) {\n    deleteVote(id: $id) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n':
    types.DeleteVoteDocument,
  '\n  query getVotesNumberForARestaurantInARange($restaurantId: String!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n':
    types.GetVotesNumberForARestaurantInARangeDocument,
  '\n  query getVotesNumberInARange($startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n':
    types.GetVotesNumberInARangeDocument,
  '\n  query getAllVotesForRestaurantInARange($restaurantId: String!, $totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(\n      pagination: { start: 0, limit: $totalNumberOfVotes }\n      filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }\n      sort: "createdAt:desc"\n    ) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n':
    types.GetAllVotesForRestaurantInARangeDocument,
  '\n  query getAllVotesInARange($totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(\n      pagination: { start: 0, limit: $totalNumberOfVotes }\n      filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }\n      sort: "createdAt:desc"\n    ) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n':
    types.GetAllVotesInARangeDocument,
  '\n  query getVotesNumberForAUser($userId: String!) {\n    votes(filters: { userId: { eq: $userId } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n':
    types.GetVotesNumberForAUserDocument,
  '\n  query getVotesForAUser($toGet: Int!, $userId: String!) {\n    votes(pagination: { start: 0, limit: $toGet }, filters: { userId: { eq: $userId } }, sort: "createdAt:desc") {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n':
    types.GetVotesForAUserDocument,
}

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getGeneral {\n    general {\n      data {\n        attributes {\n          title\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getGeneral {\n    general {\n      data {\n        attributes {\n          title\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation createRestaurant($name: String!, $description: String!, $url: String!){\n        createRestaurant(data:{name:$name, description: $description, url: $url, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    name\n                    description\n                    url\n                }\n            }\n        }\n    } \n'
): typeof documents['\n    mutation createRestaurant($name: String!, $description: String!, $url: String!){\n        createRestaurant(data:{name:$name, description: $description, url: $url, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    name\n                    description\n                    url\n                }\n            }\n        }\n    } \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updateRestaurant($id: ID!, $name: String, $description: String, $url: String) {\n    updateRestaurant(id: $id, data: { name: $name, description: $description, url: $url }) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  mutation updateRestaurant($id: ID!, $name: String, $description: String, $url: String) {\n    updateRestaurant(id: $id, data: { name: $name, description: $description, url: $url }) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getRestaurants($from: Int!, $toGet: Int!) {\n    restaurants(pagination: { start: $from, limit: $toGet }) {\n      meta {\n        pagination {\n          pageCount\n        }\n      }\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getRestaurants($from: Int!, $toGet: Int!) {\n    restaurants(pagination: { start: $from, limit: $toGet }) {\n      meta {\n        pagination {\n          pageCount\n        }\n      }\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteRestaurant($id: ID!) {\n    deleteRestaurant(id: $id) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  mutation deleteRestaurant($id: ID!) {\n    deleteRestaurant(id: $id) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getRestaurantById($restaurantId: ID!) {\n    restaurant(id: $restaurantId) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getRestaurantById($restaurantId: ID!) {\n    restaurant(id: $restaurantId) {\n      data {\n        id\n        attributes {\n          name\n          description\n          url\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation createAppUser($userId: String!, $email: String, $userName:String $imageUrl: String){\n        createAppUser(data:{userId: $userId, email:$email, userName:$userName, imageUrl: $imageUrl, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    email\n                    imageUrl\n                    userId\n                    userName\n                }\n            }\n        }\n    } \n'
): typeof documents['\n    mutation createAppUser($userId: String!, $email: String, $userName:String $imageUrl: String){\n        createAppUser(data:{userId: $userId, email:$email, userName:$userName, imageUrl: $imageUrl, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    email\n                    imageUrl\n                    userId\n                    userName\n                }\n            }\n        }\n    } \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getAppUsers($userId: String!) {\n    appUsers(filters: { userId: { eq: $userId } }) {\n      data {\n        id\n        attributes {\n          email\n          userName\n          imageUrl\n          userId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getAppUsers($userId: String!) {\n    appUsers(filters: { userId: { eq: $userId } }) {\n      data {\n        id\n        attributes {\n          email\n          userName\n          imageUrl\n          userId\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation createVote($userId: String!, $restaurantId: String!){\n    createVote(data:{userId:$userId, restaurantId: $restaurantId, publishedAt: ""}){\n      data{\n        id\n        attributes{\n          userId\n          restaurantId\n        }\n      }\n    }\n  } \n'
): typeof documents['\n  mutation createVote($userId: String!, $restaurantId: String!){\n    createVote(data:{userId:$userId, restaurantId: $restaurantId, publishedAt: ""}){\n      data{\n        id\n        attributes{\n          userId\n          restaurantId\n        }\n      }\n    }\n  } \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getVotes {\n    votes {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getVotes {\n    votes {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getRestaurantVote($restaurantId: String!) {\n    votes(filters: { restaurantId: { eq: $restaurantId } }, sort: "createdAt:desc") {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getRestaurantVote($restaurantId: String!) {\n    votes(filters: { restaurantId: { eq: $restaurantId } }, sort: "createdAt:desc") {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deleteVote($id: ID!) {\n    deleteVote(id: $id) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  mutation deleteVote($id: ID!) {\n    deleteVote(id: $id) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getVotesNumberForARestaurantInARange($restaurantId: String!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getVotesNumberForARestaurantInARange($restaurantId: String!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getVotesNumberInARange($startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getVotesNumberInARange($startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getAllVotesForRestaurantInARange($restaurantId: String!, $totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(\n      pagination: { start: 0, limit: $totalNumberOfVotes }\n      filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }\n      sort: "createdAt:desc"\n    ) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getAllVotesForRestaurantInARange($restaurantId: String!, $totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(\n      pagination: { start: 0, limit: $totalNumberOfVotes }\n      filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }\n      sort: "createdAt:desc"\n    ) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getAllVotesInARange($totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(\n      pagination: { start: 0, limit: $totalNumberOfVotes }\n      filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }\n      sort: "createdAt:desc"\n    ) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getAllVotesInARange($totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {\n    votes(\n      pagination: { start: 0, limit: $totalNumberOfVotes }\n      filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }\n      sort: "createdAt:desc"\n    ) {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getVotesNumberForAUser($userId: String!) {\n    votes(filters: { userId: { eq: $userId } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getVotesNumberForAUser($userId: String!) {\n    votes(filters: { userId: { eq: $userId } }) {\n      meta {\n        pagination {\n          total\n        }\n      }\n    }\n  }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query getVotesForAUser($toGet: Int!, $userId: String!) {\n    votes(pagination: { start: 0, limit: $toGet }, filters: { userId: { eq: $userId } }, sort: "createdAt:desc") {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n'
): typeof documents['\n  query getVotesForAUser($toGet: Int!, $userId: String!) {\n    votes(pagination: { start: 0, limit: $toGet }, filters: { userId: { eq: $userId } }, sort: "createdAt:desc") {\n      data {\n        id\n        attributes {\n          userId\n          restaurantId\n        }\n      }\n    }\n  }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
