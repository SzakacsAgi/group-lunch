import { gql } from '@apollo/client'

export const GET_GENERAL = gql`
  query getGeneral {
    general {
      data {
        attributes {
          title
        }
      }
    }
  }
`
