import React, { ForwardedRef, forwardRef, useEffect, useRef } from 'react'
import { Listbox, ListboxItem, Avatar } from '@nextui-org/react'
import { AppUser } from '../../../gql/graphql'

interface RestVotesProp {
  users: AppUser[]
  closeRestVotes: () => void
}
const RestVotes = forwardRef(function RestVotes({ users, closeRestVotes }: RestVotesProp, ref: ForwardedRef<HTMLDivElement>) {
  const listBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const isRefObject = (ref: ForwardedRef<HTMLDivElement>): ref is React.MutableRefObject<HTMLDivElement | null> =>
        ref !== null && typeof ref === 'object' && 'current' in ref

      if (listBoxRef.current && !listBoxRef.current.contains(e.target as Node) && isRefObject(ref) && ref.current && !ref.current.contains(e.target as Node)) {
        closeRestVotes()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [ref, listBoxRef, closeRestVotes])

  return (
    <div className='w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 bg-yellow-200'>
      <Listbox
        ref={listBoxRef}
        classNames={{
          base: 'max-w-lg',
          list: 'max-h-[300px]',
        }}
        items={users}
        label='Assigned to'
        variant='flat'>
        {(item) => (
          <ListboxItem key={item.userId!} textValue={item.userName!} className='cursor-default'>
            <div className='flex gap-2 items-center hover:bg-inherit'>
              <Avatar alt={item!.userName!} className='flex-shrink-0' size='sm' src={item.imageUrl!} />
              <div className='flex flex-col'>
                <span className='text-small'>{item.userName!}</span>
                <span className='text-tiny text-default-400'>{item.email!}</span>
              </div>
            </div>
          </ListboxItem>
        )}
      </Listbox>
    </div>
  )
})

export default RestVotes
