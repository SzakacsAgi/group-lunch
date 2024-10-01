'use client'
import { useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_USER, GET_USER } from '../query/user'
import { useUser } from '@auth0/nextjs-auth0/client'
import TodaysVote from './components/dashboard/TodaysVote'

const App = () => {
  const [createUser] = useMutation(CREATE_USER)
  const user = useUser()
  const [getUser] = useLazyQuery(GET_USER)

  useEffect(() => {
    const saveUser = async () => {
      if (!user.isLoading && user.user) {
        const userCheckResult = await getUser({ variables: { userId: user.user!.sub } })

        if (userCheckResult.data.appUsers.data.length === 0) {
          createUser({ variables: { userId: user.user!.sub, email: user.user?.email, imageUrl: user.user?.picture, userName: user.user?.name } })
        }
      }
    }
    saveUser()
  }, [user.isLoading])

  return (
    <div className='p-10'>
      <TodaysVote />
    </div>
  )
}

export default App
