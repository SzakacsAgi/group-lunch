'use client'
import { useEffect, useState } from 'react'
import RestaurantCard from './components/Card'
import CardSkeleton from './components/skeleton/CardSkeleton'
import { useRestaurantCRUD } from './api/restaurantCRUD'

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  const { allRestaurant } = useRestaurantCRUD()

  useEffect(() => {
    if (allRestaurant.data && !allRestaurant.loading) {
      setRestaurants(allRestaurant.data.restaurants.data)
    }
  }, [allRestaurant.data, allRestaurant.loading])

  useEffect(() => {
    allRestaurant.refetch()
  }, [allRestaurant])

  const detectContent = () => {
    if (allRestaurant.loading) {
      return (
        <div className='grid grid-cols-3 gap-6 items-center'>
          {Array.from({ length: 6 }).map(() => (
            <div key={Math.random()}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      )
    }
    if (allRestaurant.data.restaurants.data.length === 0) {
      return <div>No restaurants</div>
    }
    if (allRestaurant.error) {
      return <div className='px-6'>Something went wrong, please try again later</div>
    }

    return (
      <div className='grid grid-cols-3 gap-6 items-center'>
        {restaurants.map((restaurant) => (
          <div key={Math.random()}>
            <RestaurantCard restaurant={restaurant} />
          </div>
        ))}
      </div>
    )
  }

  return <div className='p-10'>{detectContent()}</div>
}

export default App
