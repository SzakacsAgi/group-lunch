'use client'
import { useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import TodaysVote from './components/dashboard/TodaysVote'
import LastWeekTopChoices from './components/dashboard/LastWeekTopChoices'
import { useUserOperations } from './api/useUserOperations'
import RecentlyVotes from './components/dashboard/RecentlyVotes'

const App = () => {
  const user = useUser()
  const { createUser, getUserById } = useUserOperations()

  useEffect(() => {
    const saveUser = async () => {
      if (!user.isLoading && user.user) {
        const isSavedUser = (await getUserById(user.user.sub!)).data.appUsers.data.length > 0
        if (!isSavedUser) {
          await createUser(user.user.sub!, user.user.email?.toString(), user.user.picture?.toString(), user.user.name?.toString())
        }
      }
    }
    saveUser()
  }, [user.isLoading])

  return (
    <div className='p-10 flex flex-col gap-y-20'>
      <TodaysVote />
      <LastWeekTopChoices />
      <RecentlyVotes />
    </div>
  )
}

export default App
