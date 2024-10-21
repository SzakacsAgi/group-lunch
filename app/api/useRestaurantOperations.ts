'use client'

import { useLazyQuery, useMutation } from '@apollo/client'
import { RestaurantData } from '../../interface'
import { CREATE_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANT_BY_ID, GET_RESTAURANTS, UPDATE_RESTAURANT } from '../../query/restaurant'
import { useRouter } from 'next/navigation'
import { RestaurantEntity, VoteEntity } from '../../gql/graphql'
import { GET_ALL_VOTES_IN_A_RANGE, GET_VOTES_NUMBER_IN_A_RANGE } from '../../query/vote'
import getTodayStartEnd from '../../utils/getTodayStartEnd'
import getPreviousWeekStartEnd from '../../utils/getPreviousWeekStartEnd'
import { useVoteOperations } from './useVoteOperations'

const useRestaurantOperations = () => {
  const [editRestaurant] = useMutation(UPDATE_RESTAURANT)
  const [addRestaurant] = useMutation(CREATE_RESTAURANT)
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT)
  const [getAllVotesInARange] = useLazyQuery(GET_ALL_VOTES_IN_A_RANGE)
  const [getRestaurantById] = useLazyQuery(GET_RESTAURANT_BY_ID)
  const [getVotesNumberInARange] = useLazyQuery(GET_VOTES_NUMBER_IN_A_RANGE, { fetchPolicy: 'no-cache' })
  const { getAllUserVotes } = useVoteOperations()
  const [getRestaurants] = useLazyQuery(GET_RESTAURANTS, { fetchPolicy: 'no-cache' })

  const router = useRouter()

  const sendUpdateRestaurantRequest = async (data: RestaurantData, restaurantId: string, imageId?: string) => {
    try {
      if (imageId) {
        await editRestaurant({
          variables: {
            id: restaurantId,
            name: data.name,
            url: data.url,
            description: data.description,
            address: data.address,
            distance: Number.parseFloat(data.distance),
            category: data.category,
            price: data.price,
            image: imageId,
          },
        })
      }
      await editRestaurant({
        variables: {
          id: restaurantId,
          name: data.name,
          url: data.url,
          description: data.description,
          address: data.address,
          distance: Number.parseFloat(data.distance),
          category: data.category,
          price: data.price,
        },
      })
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const sendCreateRestaurantRequest = async (data: RestaurantData, _restId: string, imageId?: string) => {
    try {
      if (imageId) {
        await addRestaurant({
          variables: {
            name: data.name,
            url: data.url,
            description: data.description,
            address: data.address,
            distance: Number.parseFloat(data.distance),
            category: data.category,
            price: data.price,
            image: imageId,
          },
        })
      }
      await addRestaurant({
        variables: {
          name: data.name,
          url: data.url,
          description: data.description,
          address: data.address,
          distance: Number.parseFloat(data.distance),
          category: data.category,
          price: data.price,
        },
      })
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

  const sendGetRecentlyVotedRestaurantsByUser = async (numberOfRestaurantToGet: number, userId: string) => {
    const userRecentlyVotes = await getAllUserVotes(userId)
    const votedRestaurantIds = userRecentlyVotes.map((vote: VoteEntity) => vote.attributes?.restaurantId)

    const filteredRestaurantIds: string[] = votedRestaurantIds.reduce((accumulator: Array<string>, restaurantId: string) => {
      if (!accumulator.includes(restaurantId)) {
        accumulator.push(restaurantId)
      }
      return accumulator
    }, [])

    let restaurantsToGet

    if (filteredRestaurantIds.length > numberOfRestaurantToGet) {
      restaurantsToGet = filteredRestaurantIds.slice(0, numberOfRestaurantToGet)
    } else {
      restaurantsToGet = filteredRestaurantIds
    }

    const getRestaurants = async () => {
      const restaurants: RestaurantEntity[] = []
      const restaurantPromises = restaurantsToGet.map(async (restaurantId: string) => {
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

  const sendGetRestaurantsRequest = async (currentPage: number, pageSize: number) => {
    const from = currentPage * pageSize
    const restaurants = await getRestaurants({ variables: { from: from, toGet: pageSize } })
    return restaurants
  }

  return {
    sendCreateRestaurantRequest,
    sendUpdateRestaurantRequest,
    sendDeleteRestaurantRequest,
    sendGetTodayVotedRestaurantsRequest,
    sendGetPrevWeeksTopVotedRestaurantsRequest,
    sendGetRecentlyVotedRestaurantsByUser,
    sendGetRestaurantsRequest,
  }
}

export { useRestaurantOperations }
