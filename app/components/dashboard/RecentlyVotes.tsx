'use client'

import { useEffect, useState } from 'react'
import Label from '../Label'
import { useUser } from '@auth0/nextjs-auth0/client'
import { RestaurantEntity } from '../../../gql/graphql'
import { useRestaurantOperations } from '../../api/useRestaurantOperations'
import Carousel from '../carousel/Carousel'
import RestaurantCard from '../restaurantCard/RestaurantCard'
import { RestaurantCardData } from '../../../interface'

const RecentlyVotes = () => {
  const { sendGetRecentlyVotedRestaurantsByUser } = useRestaurantOperations()
  const user = useUser()
  const [restaurants, setRestaurants] = useState<RestaurantEntity[]>()
  const [error, setError] = useState(false)

  useEffect(() => {
    const getRecentlyVotedRestaurants = async () => {
      if (!user.isLoading && user.user) {
        try {
          const recentlyVotedRestaurants = await sendGetRecentlyVotedRestaurantsByUser(5, user.user!.sub!)
          setRestaurants(recentlyVotedRestaurants)
        } catch (error) {
          console.error(error)
          setError(true)
        }
      }
    }
    getRecentlyVotedRestaurants()
  }, [user.isLoading])

  const detectContent = () => {
    if (error) {
      return <div>Error</div>
    }
    if (!restaurants) {
      return <div>Loading...</div>
    }

    const slides = restaurants.map((restaurants) => (
      <RestaurantCard key={`recent-${restaurants.id}`} restaurant={restaurants} dataToShow={[RestaurantCardData.TITLE, RestaurantCardData.DESCRIPTION]} />
    ))

    return <Carousel slides={slides} />
  }

  return (
    <div className='max-w-[93vw] flex flex-col gap-y-10'>
      <Label labelText='My recent votes' size='2xl' />
      <div className='px-10'>{detectContent()}</div>
    </div>
  )
}

export default RecentlyVotes
