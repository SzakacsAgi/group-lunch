import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useVoteCRUD } from '../../api/voteCRUD'
import { RestaurantEntity, VoteEntity } from '../../../gql/graphql'
import AvatarGroup from './avatarGroup/AvatarGroup'
import { PlusIcon } from '@heroicons/react/24/solid'
import { RestaurantCardData } from '../../../interface'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Button from '../button/Button'

interface RestaurantCardProps {
  restaurant: RestaurantEntity
  dataToShow: RestaurantCardData[]
}

const RestaurantCard = ({ restaurant, dataToShow }: RestaurantCardProps) => {
  const router = useRouter()
  const user = useUser()
  const { todaysVotes, sendDeleteVoteRequest, sendCreateVoteRequest } = useVoteCRUD({ restaurantId: restaurant.id!.toString() })

  const handleViewClick = () => {
    router.push(`/view/${restaurant.id}`)
  }

  const toBeDisplayed = (dataName: RestaurantCardData) => {
    return dataToShow.includes(dataName)
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
      <div className='flex w-full gap-y-3 justify-between items-center'>
        {toBeDisplayed(RestaurantCardData.VOTES) && isVotesForRestaurant ? (
          <AvatarGroup allVotes={todaysVotes.data.votes.data} />
        ) : (
          <div>No votes for this restaurant yet</div>
        )}
        {toBeDisplayed(RestaurantCardData.CAN_VOTE) && user.user && (
          <div>
            {myVote.length > 0 ? (
              <Button onClick={() => sendDeleteVoteRequest(myVote[0].id)} buttonText='Remove' size='sm' endContent={XMarkIcon} />
            ) : (
              <Button onClick={sendCreateVoteRequest} buttonText='Add' size='sm' endContent={PlusIcon} />
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className='overflow-visible max-w-80 rounded-md'>
      <CardHeader className='h-52 rounded-t-md bg-center bg-[url("https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw")]' />
      <CardBody className='flex flex-col gap-y-3 p-5 pb-2'>
        <div className='flex gap-x-2'>
          {toBeDisplayed(RestaurantCardData.TITLE) && <h3 className='text-2xl font-medium'>{restaurant?.attributes?.title}</h3>}
          <ArrowTopRightOnSquareIcon className='w-3 cursor-pointer' onClick={handleViewClick} />
        </div>
        {toBeDisplayed(RestaurantCardData.DESCRIPTION) && <p>{restaurant?.attributes?.description}</p>}
        {toBeDisplayed(RestaurantCardData.URL) && <p>{restaurant?.attributes?.url}</p>}
      </CardBody>
      <CardFooter className='flex flex-col justify-center items-center p-5 px-7 pt-1 overflow-visible'>{detectContent()}</CardFooter>
    </Card>
  )
}

export default RestaurantCard
