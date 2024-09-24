import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useVoteCRUD } from '../../api/voteCRUD'
import { RestaurantEntity, VoteEntity } from '../../../gql/graphql'
import AvatarGroup from './avatarGroup/AvatarGroup'

interface RestaurantCardProps {
  restaurant: RestaurantEntity
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const router = useRouter()
  const user = useUser()
  const { todaysVotes, sendDeleteVoteRequest, sendCreateVoteRequest } = useVoteCRUD({ restaurantId: restaurant.id!.toString() })
  const handleViewClick = () => {
    router.push(`/view/${restaurant.id}`)
  }

  const detectContent = () => {
    if (todaysVotes.loading) {
      return <div>Loading...</div>
    }
    if (todaysVotes.error) {
      return <div className='px-6'>Something went wrong, please try again later</div>
    }

    const isVotesForRestaurant = todaysVotes.data.votes.data.length !== 0
    const myVote = todaysVotes.data.votes.data.filter((vote: VoteEntity) => vote.attributes?.userId === user.user?.sub)

    return (
      <div className='p-5 flex flex-col gap-y-3 justify-center items-center relative'>
        {isVotesForRestaurant ? <AvatarGroup allVotes={todaysVotes.data.votes.data} /> : <div>No votes for this restaurant yet</div>}
        {user.user && (
          <div>
            {myVote.length > 0 ? (
              <Button onClick={() => sendDeleteVoteRequest(myVote[0].id)}>Remove my vote</Button>
            ) : (
              <Button onClick={sendCreateVoteRequest}>Add my vote</Button>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className='overflow-visible'>
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
      <CardFooter className='flex flex-col justify-center items-center pt-0 overflow-visible'>
        <Button color='primary' variant='light' className='my-2' onClick={handleViewClick}>
          View
        </Button>
        <Divider />
        {detectContent()}
      </CardFooter>
    </Card>
  )
}

export default RestaurantCard
