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
  '\nquery getGeneral{\n  general{\n    data{\n      attributes{\n        title\n      }\n    }\n  }\n}\n': types.GetGeneralDocument,
  '\n    mutation createRestaurant($title: String!, $description: String!, $url: String!){\n        createRestaurant(data:{title:$title, description: $description, url: $url, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n':
    types.CreateRestaurantDocument,
  '\n    mutation updateRestaurant($id: ID!, $title:String){\n        updateRestaurant(id:$id, data:{ title: $title }){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n':
    types.UpdateRestaurantDocument,
  '\n    query getRestaurants{\n      restaurants{\n        data{\n        id\n          attributes{\n            title\n            description\n            url\n          }\n        }\n       }\n    }\n':
    types.GetRestaurantsDocument,
  '\n    mutation deleteRestaurant($id: ID!){\n        deleteRestaurant(id:$id){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n':
    types.DeleteRestaurantDocument,
  '\n    query getRestaurantById($id:ID!){\n        restaurant(id:$id){\n            data{\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    }\n':
    types.GetRestaurantByIdDocument,
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
  source: '\nquery getGeneral{\n  general{\n    data{\n      attributes{\n        title\n      }\n    }\n  }\n}\n'
): typeof documents['\nquery getGeneral{\n  general{\n    data{\n      attributes{\n        title\n      }\n    }\n  }\n}\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation createRestaurant($title: String!, $description: String!, $url: String!){\n        createRestaurant(data:{title:$title, description: $description, url: $url, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n'
): typeof documents['\n    mutation createRestaurant($title: String!, $description: String!, $url: String!){\n        createRestaurant(data:{title:$title, description: $description, url: $url, publishedAt: ""}){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation updateRestaurant($id: ID!, $title:String){\n        updateRestaurant(id:$id, data:{ title: $title }){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n'
): typeof documents['\n    mutation updateRestaurant($id: ID!, $title:String){\n        updateRestaurant(id:$id, data:{ title: $title }){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query getRestaurants{\n      restaurants{\n        data{\n        id\n          attributes{\n            title\n            description\n            url\n          }\n        }\n       }\n    }\n'
): typeof documents['\n    query getRestaurants{\n      restaurants{\n        data{\n        id\n          attributes{\n            title\n            description\n            url\n          }\n        }\n       }\n    }\n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    mutation deleteRestaurant($id: ID!){\n        deleteRestaurant(id:$id){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n'
): typeof documents['\n    mutation deleteRestaurant($id: ID!){\n        deleteRestaurant(id:$id){\n            data{\n                id\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    } \n']
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n    query getRestaurantById($id:ID!){\n        restaurant(id:$id){\n            data{\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    }\n'
): typeof documents['\n    query getRestaurantById($id:ID!){\n        restaurant(id:$id){\n            data{\n                attributes{\n                    title\n                    description\n                    url\n                }\n            }\n        }\n    }\n']

export function graphql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
