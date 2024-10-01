'use client'
import { RestaurantEntity } from '../../gql/graphql'
import { RestaurantCardData } from '../../interface'
import { useRestaurantCRUD } from '../api/restaurantCRUD'
import RestaurantCard from '../components/restaurantCard/RestaurantCard'

const VotePage = () => {
  const { allRestaurant } = useRestaurantCRUD()

  if (allRestaurant.loading) {
    return <div className='p-10'>Loading...</div>
  }
  return (
    <div className='p-10'>
      <div className='grid grid-cols-3 gap-6 items-center'>
        {allRestaurant.data.restaurants.data.map((restaurant: RestaurantEntity) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            dataToShow={[RestaurantCardData.TITLE, RestaurantCardData.DESCRIPTION, RestaurantCardData.VOTES, RestaurantCardData.CAN_VOTE]}
          />
        ))}
      </div>
    </div>
  )
}

export default VotePage
