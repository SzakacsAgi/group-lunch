'use client'
import { RestaurantEntity } from '../../gql/graphql'
import { RestaurantCardData } from '../../interface'
import { useRestaurantOperations } from '../api/useRestaurantOperations'
import RestaurantCard from '../components/restaurantCard/RestaurantCard'
import getTodayStartEnd from '../../utils/getTodayStartEnd'
import { useVoteOperations } from '../api/useVoteOperations'
import { useInfiniteScroll } from '../api/useInfiniteScroll'
import { useEffect, useState } from 'react'

const VotePage = () => {
  const [restaurant, setRestaurant] = useState<RestaurantEntity[]>([])
  const { fetchData, response } = useInfiniteScroll<RestaurantEntity, 'restaurants'>('restaurants', 9)
  const { sendGetRestaurantsRequest } = useRestaurantOperations()

  useEffect(() => {
    fetchData(sendGetRestaurantsRequest, false)
  }, [])

  useEffect(() => {
    if (!response.loading && response.data && response.data.length > 0) {
      setRestaurant((prevState) => [...prevState, ...response.data!])
    }
  }, [response.data, response.loading])

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 && !response.loading) {
      fetchData(sendGetRestaurantsRequest, false)
    }
  }

  useEffect(() => {
    if (response.hasMore) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [response.loading])

  const { getAllVotesForRestaurantInARange } = useVoteOperations()

  const detectContent = () => {
    if (response.error) {
      return <div>Error</div>
    }

    if (response.loading && restaurant.length === 0) {
      return <div className={`p-10 h-[90vh]`}>Loading...</div>
    }

    if (response.data!.length === 0 && restaurant.length === 0) {
      return <div>There is no restaurant to vote</div>
    }

    return (
      <section className='flex w-full gap-x-10'>
        <aside className='w-56 border border-gray-600 sticky max-h-screen top-[0px] rounded-lg border-b-0 rounded-b-none mt-10 z-50'>
          <div>Szűrés</div>
        </aside>
        <div className='w-full flex flex-col gap-y-1'>
          <div className='mt-10 mb-5'>
            <input className='border-gray-600 border rounded-md' type='text' name='' id='' />
          </div>
          <div className='grid gap-8 items-center md:grid-cols-2 xl:grid-cols-3 pb-5'>
            {restaurant.map((restaurant: RestaurantEntity) => {
              const { startOfToday, endOfToday } = getTodayStartEnd()
              return (
                <RestaurantCard
                  key={restaurant.id}
                  getVotes={() => getAllVotesForRestaurantInARange(restaurant.id!, startOfToday, endOfToday)}
                  dataToShow={[RestaurantCardData.NAME, RestaurantCardData.VOTES, RestaurantCardData.CAN_VOTE, RestaurantCardData.DESCRIPTION]}
                  restaurant={restaurant}
                />
              )
            })}
            {response.loading && <div>loadiiing</div>}
          </div>
        </div>
      </section>
    )
  }

  return detectContent()
}

export default VotePage
