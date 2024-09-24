import { gql } from '@apollo/client'

export const CREATE_VOTE = gql`
  mutation createVote($userId: String!, $restaurantId: String!){
    createVote(data:{userId:$userId, restaurantId: $restaurantId, publishedAt: "${new Date().toISOString()}"}){
      data{
        id
        attributes{
          userId
          restaurantId
        }
      }
    }
  } 
`

export const GET_ALL_VOTES = gql`
  query getVotes {
    votes {
      data {
        id
        attributes {
          userId
          restaurantId
        }
      }
    }
  }
`

export const GET_VOTES_FOR_RESTAURANT = gql`
  query getRestaurantVote($restaurantId: String!) {
    votes(filters: { restaurantId: { eq: $restaurantId } }, sort: "createdAt:desc") {
      data {
        id
        attributes {
          userId
          restaurantId
        }
      }
    }
  }
`

export const DELETE_VOTE = gql`
  mutation deleteVote($id: ID!) {
    deleteVote(id: $id) {
      data {
        id
        attributes {
          userId
          restaurantId
        }
      }
    }
  }
`

const today = new Date()
const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString()
const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString()

export const GET_TODAYS_VOTES = gql`  
  query getTodaysVotes($restaurantId: String!) {
    votes(filters: { 
      createdAt: { 
        gte: "${startOfDay}", 
        lte: "${endOfDay}" 
      },
        restaurantId: { eq: $restaurantId }
    }, sort: "createdAt:desc") {
      data{
        id
        attributes {
          userId
          restaurantId
        }
      }
    }
  }
`
