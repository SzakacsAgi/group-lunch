import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useUser } from '@auth0/nextjs-auth0/client'
import { useVoteOperations } from '../../api/useVoteOperations'
import { RestaurantEntity, VoteEntity } from '../../../gql/graphql'
import AvatarGroup from './avatarGroup/AvatarGroup'
import { PlusIcon } from '@heroicons/react/24/solid'
import { RestaurantCardData, VotesData } from '../../../interface'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import Button from '../button/Button'
import { useEffect, useState } from 'react'
import { OperationVariables, QueryResult } from '@apollo/client'

interface RestaurantCardProps {
  restaurant: RestaurantEntity
  dataToShow: RestaurantCardData[]
  getVotes?: () => Promise<QueryResult<VotesData, OperationVariables>>
}

const RestaurantCard = ({ restaurant, dataToShow, getVotes }: RestaurantCardProps) => {
  const router = useRouter()
  const user = useUser()
  const { sendDeleteVoteRequest, sendCreateVoteRequest } = useVoteOperations()
  const [votes, setVotes] = useState<QueryResult<VotesData, OperationVariables> | null>(null)
  const [voteModifiedCount, setVoteModifiedCount] = useState(0)

  useEffect(() => {
    const fetchVotes = async () => {
      const votes = await getVotes!()
      setVotes(votes)
    }
    getVotes && fetchVotes()
  }, [voteModifiedCount])

  const handleViewClick = () => {
    router.push(`/view/${restaurant.id}`)
  }

  const toBeDisplayed = (dataName: RestaurantCardData) => {
    return dataToShow.includes(dataName)
  }

  const detectVotes = () => {
    if (!votes) {
      return <div>Votes loading...</div>
    }

    if (votes.error) {
      return <div className='px-6'>Something went wrong with votes loading, please try again later</div>
    }

    const isVotesForRestaurant = votes!.data?.votes.data.length !== 0
    const myVote = votes!.data!.votes.data.filter((vote: VoteEntity) => vote.attributes!.userId === user.user?.sub)

    return (
      <div className='flex w-full gap-y-3 justify-between items-center mx-auto'>
        {toBeDisplayed(RestaurantCardData.VOTES) && isVotesForRestaurant ? (
          <AvatarGroup usersToShow={votes.data!.votes.data} />
        ) : (
          <div>No votes for this restaurant yet</div>
        )}
        {toBeDisplayed(RestaurantCardData.CAN_VOTE) && user.user && (
          <div>
            {myVote.length > 0 ? (
              <Button
                onClick={async () => {
                  await sendDeleteVoteRequest(myVote[0].id!)
                  setVoteModifiedCount((prev) => prev + 1)
                }}
                buttonText='Remove'
                size='sm'
                endContent={XMarkIcon}
              />
            ) : (
              <Button
                onClick={async () => {
                  await sendCreateVoteRequest(restaurant.id!.toString())
                  setVoteModifiedCount((prev) => prev + 1)
                }}
                buttonText='Add'
                size='sm'
                endContent={PlusIcon}
              />
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className='overflow-visible max-w-80 rounded-md'>
      <CardHeader
        className='h-52 rounded-t-md bg-center bg-no-repeat'
        style={{
          backgroundImage: `url(${
            restaurant.attributes?.image?.data?.attributes?.formats?.small?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${restaurant.attributes?.image?.data?.attributes?.formats.small.url}`
              : restaurant.attributes?.image?.data?.attributes?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${restaurant.attributes?.image?.data?.attributes?.url}`
              : 'https://lh5.googleusercontent.com/proxy/t08n2HuxPfw8OpbutGWjekHAgxfPFv-pZZ5_-uTfhEGK8B5Lp-VN4VjrdxKtr8acgJA93S14m9NdELzjafFfy13b68pQ7zzDiAmn4Xg8LvsTw1jogn_7wStYeOx7ojx5h63Gliw'
          })`,
        }}
      />
      <CardBody className='flex flex-col gap-y-3 p-5 pb-2'>
        <div className='flex gap-x-2'>
          {toBeDisplayed(RestaurantCardData.NAME) && <h3 className='text-2xl font-medium'>{restaurant?.attributes?.name}</h3>}
          <ArrowTopRightOnSquareIcon className='w-3 cursor-pointer' onClick={handleViewClick} />
        </div>
        {toBeDisplayed(RestaurantCardData.DESCRIPTION) && <p>{restaurant?.attributes?.description}</p>}
        {toBeDisplayed(RestaurantCardData.URL) && <p>{restaurant?.attributes?.url}</p>}
      </CardBody>
      {toBeDisplayed(RestaurantCardData.VOTES) && (
        <CardFooter
          className={`flex flex-col justify-center items-center p-5 px-7 pt-1 overflow-visible ${votes?.data!.votes.data.length === 0 ? 'px-5' : ''}`}>
          {detectVotes()}
        </CardFooter>
      )}
    </Card>
  )
}

export default RestaurantCard
