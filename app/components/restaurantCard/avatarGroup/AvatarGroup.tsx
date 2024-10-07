import { Avatar, AvatarGroup as NextAvatarGroup, Tooltip } from '@nextui-org/react'
import { AppUser, VoteEntity } from '../../../../gql/graphql'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import RestVotes from '../RestVotes'
import React from 'react'
import { useUserOperations } from '../../../api/useUserOperations'

interface AvatarGroupProps {
  usersToShow: VoteEntity[]
}

const AvatarGroup: FunctionComponent<AvatarGroupProps> = ({ usersToShow }) => {
  const { getVotedUserInfo } = useUserOperations()

  useEffect(() => {
    const fetchUserInfos = async () => {
      const usersData = await Promise.all(usersToShow.map(async (vote: VoteEntity) => await getVotedUserInfo(vote)))

      const uniqueUsers = usersData.reduce((acc, current) => {
        const isDuplicate = acc.find((user: AppUser) => user.userId === current.userId)
        if (!isDuplicate) {
          acc.push(current)
        }
        return acc
      }, [])

      setUserInfos(uniqueUsers)
    }

    fetchUserInfos()
  }, [usersToShow])

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
        <div className='absolute -bottom-16 left-2.5 z-20'>
          <RestVotes users={restVotes} closeRestVotes={handleMoreClick} ref={restVotesTogglerRef} />
        </div>
      )}
    </>
  )
}

export default AvatarGroup
