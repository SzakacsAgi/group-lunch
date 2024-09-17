'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'

const EditRestaurant = ({ params }: { params: { slug: string } }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [restaurantDetail, setRestaurantDetail] = useState<any>()

  useEffect(() => {
    const getRestaurantDetail = async () => {
      try {
        const detail = await axios.get(`https://places.googleapis.com/v1/places/${params.slug}?key=${process.env.GOOGLE_PLACES_KEY}`, {
          headers: {
            'X-Goog-FieldMask': 'displayName',
          },
        })
        setRestaurantDetail(detail.data)
      } catch (error) {
        console.error(error)
        setRestaurantDetail('error')
      }
    }
    getRestaurantDetail()
  }, [params.slug])

  if (!restaurantDetail) {
    return <div>Loading...</div>
  }
  if (restaurantDetail === 'error') {
    return <div className='px-6'>Something went wrong, please try again later</div>
  }

  return <div>{restaurantDetail.displayName.text}</div>
}

export default EditRestaurant
