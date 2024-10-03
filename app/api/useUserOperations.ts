import { useLazyQuery, useMutation } from '@apollo/client'
import { VoteEntity } from '../../gql/graphql'
import { CREATE_USER, GET_USER } from '../../query/user'

const useUserOperations = () => {
  const [getUser] = useLazyQuery(GET_USER)
  const [createUserQuery] = useMutation(CREATE_USER)

  const getVotedUserInfo = async (vote: VoteEntity) => {
    const { data } = await getUser({ variables: { userId: vote.attributes?.userId } })
    return data.appUsers.data[0].attributes
  }

  const getUserById = async (userId: string) => {
    return await getUser({ variables: { userId: userId } })
  }

  const createUser = async (userId: string, email?: string, imageUrl?: string, userName?: string) => {
    return await createUserQuery({ variables: { userId: userId, email: email, imageUrl: imageUrl, userName: userName } })
  }

  return { getVotedUserInfo, getUserById, createUser }
}
export { useUserOperations }
