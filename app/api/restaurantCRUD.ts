'use client'

import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { RestaurantData } from '../../interface'
import { CREATE_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANT_BY_ID, GET_RESTAURANTS, UPDATE_RESTAURANT } from '../../query/restaurant'
import { useRouter } from 'next/navigation'
import { GET_ALL_TODAYS_VOTES, GET_NUMBER_OF_TODAYS_VOTES } from '../../query/vote'
import { RestaurantEntity, VoteEntity } from '../../gql/graphql'

interface Pagination {
  hasNextPage: boolean
}

interface TodayVotedRestaurants {
  restaurants: RestaurantEntity[]
  pagination: Pagination
}

const useRestaurantCRUD = () => {
  const [editRestaurant] = useMutation(UPDATE_RESTAURANT)
  const [addRestaurant] = useMutation(CREATE_RESTAURANT)
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT)
  const allRestaurant = useQuery(GET_RESTAURANTS)
  const [getAllTodaysVotes] = useLazyQuery(GET_ALL_TODAYS_VOTES)
  const [getNumberOfTodaysVotes] = useLazyQuery(GET_NUMBER_OF_TODAYS_VOTES)
  const [getRestaurantById] = useLazyQuery(GET_RESTAURANT_BY_ID)

  const router = useRouter()

  const sendUpdateRestaurantRequest = async (data: RestaurantData, id: string) => {
    try {
      await editRestaurant({
        variables: {
          id: id,
          title: data.title,
          url: data.url,
          description: data.description,
        },
      })
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const sendCreateRestaurantRequest = async (data: RestaurantData) => {
    try {
      await addRestaurant({
        variables: {
          title: data.title,
          url: data.url,
          description: data.description,
        },
      })
      allRestaurant.refetch()
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const sendDeleteRestaurantRequest = async (id: string) => {
    try {
      await deleteRestaurant({
        variables: {
          id: id,
        },
      })
      router.push('/')
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const sendGetTodayVotedRestaurantsRequest = async (pageSize: number, currentPage: number): Promise<TodayVotedRestaurants> => {
    try {
      const numberOfTodaysVotesRequestResponse = await getNumberOfTodaysVotes()
      const numberOfTodaysVotes = numberOfTodaysVotesRequestResponse.data.votes.meta.pagination.total

      const allTodayVotesRequestResponse = await getAllTodaysVotes({
        variables: { numberOfTodaysVotes: numberOfTodaysVotes },
      })

      const allTodayVotes = await allTodayVotesRequestResponse.refetch()
      const todayVotedRestaurantsId = allTodayVotes.data.votes.data.map((vote: VoteEntity) => vote.attributes!.restaurantId)

      const uniqueRestaurantsId = Array.from(new Set(todayVotedRestaurantsId))

      const to = Math.min(...[uniqueRestaurantsId.length, pageSize * currentPage])
      const restaurants: RestaurantEntity[] = []

      for (let i = pageSize * currentPage - pageSize; i < to; i++) {
        const restaurant = await getRestaurantById({ variables: { restaurantId: uniqueRestaurantsId[i] } })
        restaurants.push(restaurant.data.restaurant.data)
      }

      return {
        restaurants: restaurants,
        pagination: {
          hasNextPage: uniqueRestaurantsId.length > currentPage * pageSize,
        },
      }
    } catch (error) {
      console.error(error)
      throw new Error('sendGetTodayVotedRestaurantsRequest failed')
    }
  }

  return { sendCreateRestaurantRequest, allRestaurant, sendUpdateRestaurantRequest, sendDeleteRestaurantRequest, sendGetTodayVotedRestaurantsRequest }
}

export { useRestaurantCRUD }
