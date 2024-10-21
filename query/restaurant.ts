import { gql } from '@apollo/client'

export const CREATE_RESTAURANT = gql`
mutation createRestaurant(
  $name: String!
  $description: String
  $url: String!
  $address: String!
  $distance: Float
  $category: String!
  $price: String!
  $image: ID
) {
  createRestaurant(
    data: {
      name: $name
      description: $description
      url: $url
      address: $address
      distance: $distance
      category: $category
      price: $price
      image: $image
      publishedAt: "${new Date().toISOString()}"
    }
  ) {
    data {
      id
      attributes {
        name
        description
        url
        address
        distance
        category
        price
        image {
            data {
              attributes {
                formats
              }
            }
          }
      }
    }
  }
}
`

export const UPDATE_RESTAURANT = gql`
  mutation updateRestaurant(
  $id:ID!
  $name: String!
  $description: String
  $url: String!
  $address: String!
  $distance: Float
  $category: String!
  $price: String!
  $image: ID
) {
  updateRestaurant(
    id: $id
    data: {
      name: $name
      description: $description
      url: $url
      address: $address
      distance: $distance
      category: $category
      price: $price
      image: $image
      publishedAt: "${new Date().toISOString()}"
    }
  ) {
    data {
      id
      attributes {
        name
        description
        url
        address
        distance
        category
        price
        image {
            data {
              attributes {
                formats
              }
            }
          }
      }
    }
  }
}
`

export const GET_RESTAURANTS = gql`
  query getRestaurants($from: Int!, $toGet: Int!) {
    restaurants(pagination: { start: $from, limit: $toGet }) {
      meta {
        pagination {
          pageCount
        }
      }
      data {
        id
        attributes {
          name
          description
          url
          address
          distance
          category
          price
          image {
            data {
              id
              attributes {
                formats
                url
              }
            }
          }
        }
      }
    }
  }
`

export const DELETE_RESTAURANT = gql`
  mutation deleteRestaurant($id: ID!) {
    deleteRestaurant(id: $id) {
      data {
        id
        attributes {
          name
          description
          url
          address
          distance
          category
          price
          image {
            data {
              id
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`

export const GET_RESTAURANT_BY_ID = gql`
  query getRestaurantById($restaurantId: ID!) {
    restaurant(id: $restaurantId) {
      data {
        id
        attributes {
          name
          description
          url
          address
          distance
          category
          price
          image {
            data {
              id
              attributes {
                formats
                url
              }
            }
          }
        }
      }
    }
  }
`
