'use client'

import { useMutation, useQuery } from '@apollo/client'
import { RestaurantData } from '../../interface'
import { CREATE_RESTAURANT, DELETE_RESTAURANT, GET_RESTAURANTS, UPDATE_RESTAURANT } from '../../query/restaurant'
import { useRouter } from 'next/navigation'

const useRestaurantCRUD = () => {
  const [editRestaurant] = useMutation(UPDATE_RESTAURANT)
  const [addRestaurant] = useMutation(CREATE_RESTAURANT)
  const [deleteRestaurant] = useMutation(DELETE_RESTAURANT)
  const allRestaurant = useQuery(GET_RESTAURANTS)

  const router = useRouter()

  const sendUpdateRestaurantRequest = async (data: RestaurantData, id: string) => {
    try {
      await editRestaurant({
        variables: {
          id: id,
          title: data.title,
          url: data.url,
          description: data.description,
        },
      })
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const sendCreateRestaurantRequest = async (data: RestaurantData) => {
    try {
      await addRestaurant({
        variables: {
          title: data.title,
          url: data.url,
          description: data.description,
        },
      })
      allRestaurant.refetch()
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  const sendDeleteRestaurantRequest = async (id: string) => {
    try {
      await deleteRestaurant({
        variables: {
          id: id,
        },
      })
      router.push('/')
    } catch (error) {
      alert('Error')
      console.error(error)
    }
  }

  return { sendCreateRestaurantRequest, allRestaurant, sendUpdateRestaurantRequest, sendDeleteRestaurantRequest }
}

export { useRestaurantCRUD }
