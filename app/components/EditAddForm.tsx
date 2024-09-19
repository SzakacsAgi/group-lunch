'use client'

import { RestaurantData } from '../../interface'
import { Button } from '@nextui-org/react'
import { FunctionComponent } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RestaurantEntity } from '../../gql/graphql'

interface EditAddFormProps {
  restaurant?: RestaurantEntity
  onSubmit: (data: RestaurantData, id: string) => Promise<void>
  onClose?: () => void
}

const EditAddForm: FunctionComponent<EditAddFormProps> = ({ restaurant, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantData>()
  const onFormSubmit: SubmitHandler<RestaurantData> = (data, e) => {
    e?.preventDefault()
    if (restaurant) {
      onSubmit(data, restaurant.id!)
    } else {
      onSubmit(data, '')
    }
    onClose && onClose()
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <label htmlFor='title' className='block'>
          Title
        </label>
        <input
          defaultValue={restaurant ? restaurant.attributes?.title?.toString() : ''}
          {...register('title', { required: true })}
          className='border border-black'
          id='title'
        />
        <p> {errors.title && <span>This field is required</span>}</p>
        <label htmlFor='description' className='block'>
          Description
        </label>
        <input
          defaultValue={restaurant ? restaurant.attributes?.description?.toString() : ''}
          {...register('description', { required: true })}
          className='border border-black'
          id='description'
        />
        <p> {errors.description && <span>This field is required</span>}</p>
        <label htmlFor='url' className='block'>
          Url
        </label>
        <input
          defaultValue={restaurant ? restaurant.attributes?.url?.toString() : ''}
          {...register('url', { required: true })}
          className='border border-black'
          id='url'
          type='url'
        />
        <p> {errors.title && <span>This field is required</span>}</p>
        <Button type='submit' color='primary'>
          {restaurant ? 'Edit' : 'Create'}
        </Button>
      </form>
    </div>
  )
}

export default EditAddForm
