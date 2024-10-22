'use client'

import { RestaurantData } from '../../interface'
import { Button } from '@nextui-org/react'
import { FunctionComponent, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { RestaurantEntity } from '../../gql/graphql'
import Label from './Label'
import Image from 'next/image'
import { useFileOperations } from '../api/useFileOperations'
import { useRecoilState } from 'recoil'
import { uploadedImageTrash } from '../../utils/atoms'

interface EditAddFormProps {
  restaurant?: RestaurantEntity
  onSubmit: (data: RestaurantData, restaurantId: string, imageId?: string) => Promise<void>
  onClose?: () => void
}

interface FileData {
  id: string | undefined
  url: string | undefined
  loading: boolean
}

const EditAddForm: FunctionComponent<EditAddFormProps> = ({ restaurant, onSubmit, onClose }) => {
  const { uploadFile, deleteFile } = useFileOperations()
  const [, setUploadedImageId] = useRecoilState(uploadedImageTrash)

  const [file, setFile] = useState<FileData>({
    id: undefined,
    url: restaurant?.attributes?.image?.data?.attributes?.formats?.small?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${restaurant?.attributes?.image?.data?.attributes?.url}`
      : undefined,
    loading: false,
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedImage = await uploadFile(e.target.files[0])
      if (file.id) {
        await deleteFile(file.id)
      }
      const fileUrl = uploadedImage.formats?.small?.url ? uploadedImage.formats?.small?.url : uploadedImage.url
      setFile((prevState) => ({ ...prevState, id: uploadedImage.id, url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${fileUrl}`, loading: false }))
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RestaurantData>()
  const onFormSubmit: SubmitHandler<RestaurantData> = (data, e) => {
    setUploadedImageId(null)
    e?.preventDefault()
    if (restaurant) {
      onSubmit(data, restaurant.id!, file.id)
    } else {
      onSubmit(data, '', file.id)
    }
    onClose && onClose()
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
        <Label labelText='Name' htmlFor='name' size='sm' required />
        <input
          defaultValue={restaurant ? restaurant.attributes?.name?.toString() : ''}
          {...register('name', { required: true })}
          className='border border-black'
          id='name'
        />
        <p> {errors.name && <span>This field is required</span>}</p>
        <Label labelText='Description' htmlFor='description' size='sm' />
        <input
          defaultValue={restaurant ? restaurant.attributes?.description?.toString() : ''}
          {...register('description')}
          className='border border-black'
          id='description'
        />
        <p> {errors.description && <span>This field is required</span>}</p>
        <Label labelText='Url' htmlFor='url' size='sm' required />
        <input
          defaultValue={restaurant ? restaurant.attributes?.url?.toString() : ''}
          {...register('url', { required: true })}
          className='border border-black'
          id='url'
          type='url'
        />
        <p>{errors.url && <span>This field is required</span>}</p>
        <Label labelText='Address' htmlFor='address' size='sm' required />
        <input
          defaultValue={restaurant ? restaurant.attributes?.address?.toString() : ''}
          {...register('address', { required: true })}
          className='border border-black'
          id='address'
        />
        <p>{errors.address && <span>This field is required</span>}</p>
        <Label labelText='Distance' htmlFor='distance' size='sm' />
        <input
          defaultValue={restaurant ? restaurant.attributes?.distance?.toString() : ''}
          {...register('distance')}
          className='border border-black'
          id='distance'
        />
        <Label labelText='Category' htmlFor='category' size='sm' required />
        <input
          defaultValue={restaurant ? restaurant.attributes?.category?.toString() : ''}
          {...register('category', { required: true })}
          className='border border-black'
          id='category'
        />
        <p>{errors.category && <span>This field is required</span>}</p>
        <Label labelText='Price' htmlFor='price' size='sm' required />
        <input
          defaultValue={restaurant ? restaurant.attributes?.price?.toString() : ''}
          {...register('price', { required: true })}
          className='border border-black'
          id='price'
        />
        <p>{errors.price && <span>This field is required</span>}</p>
        <Label labelText='Image' htmlFor='image' size='sm' />
        <input {...register('image')} className='border border-black' id='image' type='file' onChange={handleFileChange} />
        {file.url && <div>{file.loading ? <div>Loading</div> : <Image src={file.url} width={200} height={100} alt='' />}</div>}
        <Button type='submit' color='primary'>
          {restaurant ? 'Edit' : 'Create'}
        </Button>
      </form>
    </div>
  )
}

export default EditAddForm
