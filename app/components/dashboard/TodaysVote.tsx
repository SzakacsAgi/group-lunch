'use client'

import { useEffect, useState } from 'react'
import { RestaurantEntity } from '../../../gql/graphql'
import { RestaurantCardData } from '../../../interface'
import { useRestaurantOperations } from '../../api/useRestaurantOperations'
import Label from '../Label'
import RestaurantCard from '../restaurantCard/RestaurantCard'
import Button from '../button/Button'
import React from 'react'
import getTodayStartEnd from '../../../utils/getTodayStartEnd'
import { useVoteOperations } from '../../api/useVoteOperations'

const TodaysVote = () => {
  const { sendGetTodayVotedRestaurantsRequest } = useRestaurantOperations()
  const { getAllVotesForRestaurantInARange } = useVoteOperations()

  const [restaurants, setRestaurants] = useState<RestaurantEntity[] | null>(null)
  const [pagination, setPagination] = useState<{ currentPage: number; pageSize: number; hasNextPage: null | boolean }>({
    currentPage: 1,
    pageSize: 6,
    hasNextPage: null,
  })
  const [error, setError] = useState(false)

  useEffect(() => {
    const getTodayVotedRestaurants = async () => {
      try {
        const todayVotedRestaurants = await sendGetTodayVotedRestaurantsRequest(pagination.pageSize, pagination.currentPage)
        if (todayVotedRestaurants.restaurants.length > 0) {
          if (restaurants) {
            setRestaurants((prevState) => [...prevState!, ...todayVotedRestaurants?.restaurants])
          } else {
            setRestaurants(todayVotedRestaurants?.restaurants as RestaurantEntity[])
          }
        } else {
          setRestaurants([])
        }

        setPagination((prevState) => ({ ...prevState, hasNextPage: todayVotedRestaurants!.pagination.hasNextPage }))
      } catch (error) {
        console.error(error)
        setError(true)
      }
    }
    getTodayVotedRestaurants()
  }, [pagination.currentPage])

  const handleLoadMoreClick = () => {
    setPagination((prevState) => ({ ...prevState, currentPage: prevState.currentPage + 1 }))
  }

  const detectContent = () => {
    if (error) {
      return <div>Error</div>
    }

    if (!restaurants) {
      return <div>Loading...</div>
    }

    if (restaurants.length === 0) {
      return <div>No today&apos;s votes</div>
    }

    return (
      <>
        <div className='grid gap-8 items-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {restaurants!.map((restaurant: RestaurantEntity) => {
            const { startOfToday, endOfToday } = getTodayStartEnd()
            return (
              <RestaurantCard
                key={restaurant.id}
                dataToShow={[RestaurantCardData.NAME, RestaurantCardData.VOTES]}
                restaurant={restaurant}
                getVotes={() => getAllVotesForRestaurantInARange(restaurant.id!, startOfToday, endOfToday)}
              />
            )
          })}
        </div>
        {pagination.hasNextPage && (
          <div className='max-w-80 self-center'>
            <Button onClick={handleLoadMoreClick} size='lg' buttonText='Load more' />
          </div>
        )}
      </>
    )
  }

  return (
    <div className='flex flex-col gap-y-10'>
      <Label labelText="Today's vote" size='2xl' />
      {detectContent()}
    </div>
  )
}

export default TodaysVote
