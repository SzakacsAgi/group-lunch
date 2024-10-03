import { useEffect, useState } from 'react'
import Label from '../Label'
import { useRestaurantOperations } from '../../api/useRestaurantOperations'
import { RestaurantEntity } from '../../../gql/graphql'
import RestaurantCard from '../restaurantCard/RestaurantCard'
import { RestaurantCardData } from '../../../interface'
import getPreviousWeekStartEnd from '../../../utils/getPreviousWeekStartEnd'
import { useVoteOperations } from '../../api/useVoteOperations'

const LastWeekTopChoices = () => {
  const { sendGetPrevWeeksTopVotedRestaurantsRequest } = useRestaurantOperations()
  const { getAllVotesForRestaurantInARange } = useVoteOperations()
  const [restaurants, setRestaurants] = useState<RestaurantEntity[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getPrevWeekTopVotedRestaurants = async () => {
      try {
        const prevWeekTopVotedRestaurants = await sendGetPrevWeeksTopVotedRestaurantsRequest()
        setRestaurants(prevWeekTopVotedRestaurants)
      } catch (error) {
        console.error(error)
        setError(true)
      }
    }
    getPrevWeekTopVotedRestaurants()
  }, [])

  const detectContent = () => {
    if (error) {
      return <div>Error</div>
    }
    if (!restaurants) {
      return <div>Loading...</div>
    }
    if (restaurants.length === 0) {
      return <div>No tops for prev week</div>
    }
    return (
      <div className='grid gap-8 items-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {restaurants.map((restaurant) => {
          const { startOfThePrevWeek, endOfThePrevWeek } = getPreviousWeekStartEnd()

          return (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              dataToShow={[RestaurantCardData.TITLE, RestaurantCardData.VOTES]}
              getVotes={() => getAllVotesForRestaurantInARange(restaurant.id!, startOfThePrevWeek, endOfThePrevWeek)}
            />
          )
        })}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-y-10'>
      <Label labelText="Last week's top choices" size='2xl' />
      {detectContent()}
    </div>
  )
}

export default LastWeekTopChoices
