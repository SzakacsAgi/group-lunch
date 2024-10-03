'use client'

import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { RestaurantData } from '../../interface'
import { CREATE_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANT_BY_ID, GET_RESTAURANTS, UPDATE_RESTAURANT } from '../../query/restaurant'
import { useRouter } from 'next/navigation'
import { RestaurantEntity, VoteEntity } from '../../gql/graphql'
import { GET_ALL_VOTES_IN_A_RANGE, GET_VOTES_NUMBER_IN_A_RANGE } from '../../query/vote'
import getTodayStartEnd from '../../utils/getTodayStartEnd'
import getPreviousWeekStartEnd from '../../utils/getPreviousWeekStartEnd'

const useRestaurantOperations = () => {
  const [editRestaurant] = useMutation(UPDATE_RESTAURANT)
  const [addRestaurant] = useMutation(CREATE_RESTAURANT)
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT)
  const allRestaurant = useQuery(GET_RESTAURANTS)
  const [getAllVotesInARange] = useLazyQuery(GET_ALL_VOTES_IN_A_RANGE)
  const [getRestaurantById] = useLazyQuery(GET_RESTAURANT_BY_ID)
  const [getVotesNumberInARange] = useLazyQuery(GET_VOTES_NUMBER_IN_A_RANGE)

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

  const sendGetTodayVotedRestaurantsRequest = async (pageSize: number, currentPage: number) => {
    try {
      const { startOfToday, endOfToday } = getTodayStartEnd()

      const numberOfTodaysVotes = (await getVotesNumberInARange({ variables: { startOfTheRange: startOfToday, endOfTheRange: endOfToday } })).data.votes.meta
        .pagination.total

      const allTodayVotes = await (
        await getAllVotesInARange({
          variables: { totalNumberOfVotes: numberOfTodaysVotes, startOfTheRange: startOfToday, endOfTheRange: endOfToday },
        })
      ).refetch()

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

  const sendGetPrevWeeksTopVotedRestaurantsRequest = async () => {
    const { startOfThePrevWeek, endOfThePrevWeek } = getPreviousWeekStartEnd()

    const numberOfPrevWeekVotes = (await getVotesNumberInARange({ variables: { startOfTheRange: startOfThePrevWeek, endOfTheRange: endOfThePrevWeek } })).data
      .votes.meta.pagination.total

    const allPrevWeekVotes = await (
      await getAllVotesInARange({
        variables: { totalNumberOfVotes: numberOfPrevWeekVotes, startOfTheRange: startOfThePrevWeek, endOfTheRange: endOfThePrevWeek },
      })
    ).refetch()

    const votesGroupByRestaurantId = allPrevWeekVotes.data.votes.data.reduce((accumulator: Record<string, string[]>, currentValue: VoteEntity) => {
      const restaurantId = currentValue.attributes!.restaurantId!
      if (accumulator[restaurantId]) {
        accumulator[restaurantId] = [...accumulator[restaurantId], currentValue.attributes!.userId]
      } else {
        accumulator[restaurantId] = [currentValue.attributes!.userId]
      }
      return accumulator
    }, {})

    const topRestaurantsId = Object.entries(votesGroupByRestaurantId as Record<string, string[]>)
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 3)
      .map((vote) => vote[0])

    const getRestaurants = async () => {
      const restaurants: RestaurantEntity[] = []
      const restaurantPromises = topRestaurantsId.map(async (restaurantId) => {
        const restaurantData = await getRestaurantById({
          variables: {
            restaurantId,
          },
        })
        return restaurantData.data.restaurant.data
      })

      const results = await Promise.all(restaurantPromises)
      restaurants.push(...results)

      return restaurants
    }
    return await getRestaurants()
  }

  return {
    sendCreateRestaurantRequest,
    allRestaurant,
    sendUpdateRestaurantRequest,
    sendDeleteRestaurantRequest,
    sendGetTodayVotedRestaurantsRequest,
    sendGetPrevWeeksTopVotedRestaurantsRequest,
  }
}

export { useRestaurantOperations }
