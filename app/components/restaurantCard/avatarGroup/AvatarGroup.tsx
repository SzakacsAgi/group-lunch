import { Avatar, AvatarGroup as NextAvatarGroup, Tooltip } from '@nextui-org/react'
import { AppUser, VoteEntity } from '../../../../gql/graphql'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import RestVotes from '../RestVotes'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../../../../query/user'

interface AvatarGroupProps {
  allVotes: VoteEntity[]
}

const AvatarGroup: FunctionComponent<AvatarGroupProps> = ({ allVotes }) => {
  const [getUser] = useLazyQuery(GET_USER)

  useEffect(() => {
    const fetchUserInfos = async () => {
      const usersData = await Promise.all(
        allVotes.map(async (vote: VoteEntity) => {
          const { data } = await getUser({ variables: { userId: vote.attributes?.userId } })
          return data.appUsers.data[0].attributes
        })
      )
      setUserInfos(usersData)
    }

    if (allVotes.length !== 0) {
      fetchUserInfos()
    }
  }, [allVotes, getUser])

  const [userInfos, setUserInfos] = useState<AppUser[]>([])
  const numberToShow = 3
  const restVotes = userInfos.filter((_userInfo, index: number) => index > numberToShow - 1)

  const [isOpen, setIsOpen] = useState(false)
  const restVotesTogglerRef = useRef(null)

  const handleMoreClick = () => {
    setIsOpen((prevState: boolean) => !prevState)
  }

  return (
    <>
      <NextAvatarGroup
        isBordered
        max={numberToShow}
        renderCount={(count) => (
          <Avatar
            ref={restVotesTogglerRef}
            className='cursor-pointer data-[hover=true]:translate-x-0 rtl:data-[hover=true]:translate-x-0'
            onClick={() => handleMoreClick()}
            name={`+${count}`}
          />
        )}>
        {userInfos.map((userInfo) => (
          <Tooltip key={userInfo.userId} content={userInfo.userName}>
            <Avatar
              className={`cursor-pointer ${userInfos.length === 1 ? 'data-[hover=true]:translate-x-0 rtl:data-[hover=true]:translate-x-0' : ''}`}
              name={userInfo.userName?.toString()}
              src={userInfo.imageUrl?.toString()}
            />
          </Tooltip>
        ))}
      </NextAvatarGroup>
      {isOpen && (
        <div className='absolute top-[68px] right-4 z-20'>
          <RestVotes users={restVotes} closeRestVotes={handleMoreClick} ref={restVotesTogglerRef} />
        </div>
      )}
    </>
  )
}

export default AvatarGroup
