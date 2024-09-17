'use client'
import { useEffect, useState } from 'react'
import RestaurantCard from './components/Card'
import CardSkeleton from './components/skeleton/CardSkeleton'
import axios from 'axios'

const App = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const request = {
          includedTypes: ['restaurant'],
          maxResultCount: 2,
          locationRestriction: {
            circle: {
              center: {
                latitude: 47.527487505918934,
                longitude: 21.625655037315173,
              },
              radius: 500.0,
            },
          },
        }

        const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby', request, {
          headers: {
            'X-Goog-Api-Key': process.env.GOOGLE_PLACES_KEY,
            'X-Goog-FieldMask': '*',
          },
        })
        setRestaurants(response.data.places)
      } catch (error) {
        console.error(error)
      }
    }
    getPlaces()
  }, [])

  const detectContent = () => {
    if (restaurants.length === 0) {
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

    if (restaurants.length === 0) {
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
