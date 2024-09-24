'use client'
import { useEffect, useState } from 'react'
import CardSkeleton from './components/skeleton/CardSkeleton'
import { useRestaurantCRUD } from './api/restaurantCRUD'
import RestaurantCard from './components/restaurantCard/RestaurantCard'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_USER, GET_USER } from '../query/user'
import { useUser } from '@auth0/nextjs-auth0/client'

const App = () => {
  const [restaurants, setRestaurants] = useState([])
  const { allRestaurant } = useRestaurantCRUD()
  const [createUser] = useMutation(CREATE_USER)
  const user = useUser()
  const [getUser] = useLazyQuery(GET_USER)

  useEffect(() => {
    const saveUser = async () => {
      if (!user.isLoading) {
        const userCheckResult = await getUser({ variables: { userId: user.user!.sub } })

        if (userCheckResult.data.appUsers.data.length === 0) {
          createUser({ variables: { userId: user.user!.sub, email: user.user?.email, imageUrl: user.user?.picture, userName: user.user?.name } })
        }
      }
    }
    saveUser()
  }, [user.isLoading])

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
    if (allRestaurant.error) {
      return <div className='px-6'>Something went wrong, please try again later</div>
    }
    if (allRestaurant.data.restaurants.data.length === 0) {
      return <div>No restaurants</div>
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
