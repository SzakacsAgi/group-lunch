import { gql } from '@apollo/client'

export const CREATE_RESTAURANT = gql`
    mutation createRestaurant($title: String!, $description: String!, $url: String!){
        createRestaurant(data:{title:$title, description: $description, url: $url, publishedAt: "${new Date().toISOString()}"}){
            data{
                id
                attributes{
                    title
                    description
                    url
                }
            }
        }
    } 
`

export const UPDATE_RESTAURANT = gql`
  mutation updateRestaurant($id: ID!, $title: String, $description: String, $url: String) {
    updateRestaurant(id: $id, data: { title: $title, description: $description, url: $url }) {
      data {
        id
        attributes {
          title
          description
          url
        }
      }
    }
  }
`

export const GET_RESTAURANTS = gql`
  query getRestaurants {
    restaurants {
      data {
        id
        attributes {
          title
          description
          url
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
          title
          description
          url
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
          title
          description
          url
        }
      }
    }
  }
`
