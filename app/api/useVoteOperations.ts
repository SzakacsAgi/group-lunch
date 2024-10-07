'use client'

import { OperationVariables, QueryResult, useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_VOTE, DELETE_VOTE, GET_VOTES_FOR_A_USER, GET_VOTES_NUMBER_FOR_A_USER } from '../../query/vote'
import { useUser } from '@auth0/nextjs-auth0/client'
import { GET_ALL_VOTES_FOR_RESTAURANT_IN_A_RANGE, GET_VOTES_NUMBER_FOR_A_RESTAURANT_IN_A_RANGE } from '../../query/vote'
import { VotesData } from '../../interface'

const useVoteOperations = () => {
  const { user } = useUser()
  const [addVote] = useMutation(CREATE_VOTE)
  const [deleteVote] = useMutation(DELETE_VOTE)
  const [getVotesNumberForARestaurantInARange] = useLazyQuery(GET_VOTES_NUMBER_FOR_A_RESTAURANT_IN_A_RANGE, { fetchPolicy: 'no-cache' })
  const [getAllVotesForRestaurantInARangeQuery] = useLazyQuery(GET_ALL_VOTES_FOR_RESTAURANT_IN_A_RANGE, { fetchPolicy: 'no-cache' })
  const [getVotesNumberForAUser] = useLazyQuery(GET_VOTES_NUMBER_FOR_A_USER, { fetchPolicy: 'no-cache' })
  const [getVotesForAUser] = useLazyQuery(GET_VOTES_FOR_A_USER, { fetchPolicy: 'no-cache' })

  const sendCreateVoteRequest = async (restaurantId: string) => {
    try {
      await addVote({
        variables: {
          userId: user?.sub,
          restaurantId: restaurantId,
        },
      })
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const sendDeleteVoteRequest = async (voteId: string) => {
    try {
      await deleteVote({
        variables: {
          id: voteId,
        },
      })
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const getAllVotesForRestaurantInARange = async (
    restaurantId: string,
    startOfTheRange: string,
    endOfTheRange: string
  ): Promise<QueryResult<VotesData, OperationVariables>> => {
    const votesNumberInThePeriod = await (
      await getVotesNumberForARestaurantInARange({
        variables: { restaurantId: restaurantId, startOfTheRange: startOfTheRange, endOfTheRange: endOfTheRange },
      })
    ).data.votes.meta.pagination.total

    return getAllVotesForRestaurantInARangeQuery({
      variables: {
        restaurantId: restaurantId,
        totalNumberOfVotes: votesNumberInThePeriod,
        startOfTheRange: startOfTheRange,
        endOfTheRange: endOfTheRange,
      },
    })
  }

  const getAllUserVotes = async (userId: string) => {
    const userVotesNumber = await (await getVotesNumberForAUser({ variables: { userId: userId } })).data.votes.meta.pagination.total
    return await (
      await getVotesForAUser({ variables: { toGet: userVotesNumber, userId: userId } })
    ).data.votes.data
  }

  return { sendCreateVoteRequest, sendDeleteVoteRequest, getAllVotesForRestaurantInARange, getAllUserVotes }
}

export { useVoteOperations }
