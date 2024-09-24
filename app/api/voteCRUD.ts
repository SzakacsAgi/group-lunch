'use client'

import { useMutation, useQuery } from '@apollo/client'
import { CREATE_VOTE, DELETE_VOTE, GET_TODAYS_VOTES } from '../../query/vote'
import { useUser } from '@auth0/nextjs-auth0/client'

interface useVoteCRUD {
  restaurantId: string
}

const useVoteCRUD = ({ restaurantId }: useVoteCRUD) => {
  const { user } = useUser()
  const [addVote] = useMutation(CREATE_VOTE)
  const [deleteVote] = useMutation(DELETE_VOTE)
  const todaysVotes = useQuery(GET_TODAYS_VOTES, { variables: { restaurantId: restaurantId } })

  const sendCreateVoteRequest = async () => {
    try {
      await addVote({
        variables: {
          userId: user?.sub,
          restaurantId: restaurantId,
        },
      })
      todaysVotes.refetch()
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
      todaysVotes.refetch()
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  return { sendCreateVoteRequest, sendDeleteVoteRequest, todaysVotes }
}

export { useVoteCRUD }
