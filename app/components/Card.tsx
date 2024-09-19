import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from '@nextui-org/react'
import { RestaurantEntity } from '../../gql/graphql'
import { useRouter } from 'next/navigation'

interface RestaurantCardProps {
  restaurant: RestaurantEntity
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
        <p>{`title: ${restaurant?.attributes?.title}`}</p>
        <p>{`description: ${restaurant?.attributes?.description}`}</p>
        <p>{`url: ${restaurant?.attributes?.url}`}</p>
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
