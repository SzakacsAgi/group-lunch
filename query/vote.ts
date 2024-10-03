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

export const GET_VOTES_NUMBER_FOR_A_RESTAURANT_IN_A_RANGE = gql`
  query getVotesNumberForARestaurantInARange($restaurantId: String!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {
    votes(filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`

export const GET_VOTES_NUMBER_IN_A_RANGE = gql`
  query getVotesNumberInARange($startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {
    votes(filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }) {
      meta {
        pagination {
          total
        }
      }
    }
  }
`

export const GET_ALL_VOTES_FOR_RESTAURANT_IN_A_RANGE = gql`
  query getAllVotesForRestaurantInARange($restaurantId: String!, $totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {
    votes(
      pagination: { start: 0, limit: $totalNumberOfVotes }
      filters: { restaurantId: { eq: $restaurantId }, createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }
      sort: "createdAt:desc"
    ) {
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
export const GET_ALL_VOTES_IN_A_RANGE = gql`
  query getAllVotesInARange($totalNumberOfVotes: Int!, $startOfTheRange: DateTime!, $endOfTheRange: DateTime!) {
    votes(
      pagination: { start: 0, limit: $totalNumberOfVotes }
      filters: { createdAt: { gte: $startOfTheRange, lte: $endOfTheRange } }
      sort: "createdAt:desc"
    ) {
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
