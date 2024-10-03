'use client'
import { RestaurantEntity } from '../../gql/graphql'
import { RestaurantCardData } from '../../interface'
import { useRestaurantOperations } from '../api/useRestaurantOperations'
import RestaurantCard from '../components/restaurantCard/RestaurantCard'
import getTodayStartEnd from '../../utils/getTodayStartEnd'
import { useVoteOperations } from '../api/useVoteOperations'

const VotePage = () => {
  const { allRestaurant } = useRestaurantOperations()
  const { getAllVotesForRestaurantInARange } = useVoteOperations()

  const detectContent = () => {
    if (allRestaurant.error) {
      return <div>Error</div>
    }

    if (allRestaurant.loading) {
      return <div>Loading...</div>
    }

    if (allRestaurant.data.restaurants.data.length === 0) {
      return <div>No today&apos;s votes</div>
    }

    return (
      <div className='grid gap-8 items-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {allRestaurant.data.restaurants.data!.map((restaurant: RestaurantEntity) => {
          const { startOfToday, endOfToday } = getTodayStartEnd()
          return (
            <RestaurantCard
              key={restaurant.id}
              getVotes={() => getAllVotesForRestaurantInARange(restaurant.id!, startOfToday, endOfToday)}
              dataToShow={[RestaurantCardData.TITLE, RestaurantCardData.VOTES, RestaurantCardData.CAN_VOTE, RestaurantCardData.DESCRIPTION]}
              restaurant={restaurant}
            />
          )
        })}
      </div>
    )
  }

  return detectContent()
}

export default VotePage
