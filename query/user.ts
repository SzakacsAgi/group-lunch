import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createAppUser($userId: String!, $email: String, $userName:String $imageUrl: String){
        createAppUser(data:{userId: $userId, email:$email, userName:$userName, imageUrl: $imageUrl, publishedAt: "${new Date().toISOString()}"}){
            data{
                id
                attributes{
                    email
                    imageUrl
                    userId
                    userName
                }
            }
        }
    } 
`

export const GET_USER = gql`
  query getAppUsers($userId: String!) {
    appUsers(filters: { userId: { eq: $userId } }) {
      data {
        id
        attributes {
          email
          userName
          imageUrl
          userId
        }
      }
    }
  }
`
