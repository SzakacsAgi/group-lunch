import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from '@nextui-org/react'
/* import { useMutation } from '@apollo/client'
import { DELETE_RESTAURANT } from '@/query/restaurant'
import { RestaurantEntity } from '@/gql/graphql' */
import { useRouter } from 'next/navigation'
import { StarIcon } from '@heroicons/react/24/solid'
import priceLevelMapper from '../utils/priceLevelMapper'
/* import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
 */
interface RestaurantCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  restaurant: any
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter()
  const handleViewClick = () => {
    router.push(`/view/${restaurant.id}`)
  }

  return (
    <Card>
      <CardHeader>
        <Image
          src='https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw'
          alt='dummy image'
        />
      </CardHeader>
      <Divider />
      <CardBody>
        <div className='flex justify-between'>
          <p>{restaurant.displayName.text}</p>
          <div className='flex gap-x-1'>
            <StarIcon className='w-5 text-yellow-300' />
            <p>{`${restaurant.rating} (${restaurant.userRatingCount})`}</p>
          </div>
        </div>
        <div>
          <p>{restaurant.shortFormattedAddress}</p>
          <p>{`${priceLevelMapper(restaurant.priceLevel)} - ${restaurant.primaryType}`}</p>
          <p>{`open: ${restaurant.currentOpeningHours.openNow}`}</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter className='flex gap-x-5'>
        <Button color='primary' variant='light' onClick={handleViewClick}>
          View
        </Button>
      </CardFooter>
    </Card>
  )
}
