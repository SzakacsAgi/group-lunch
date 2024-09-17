import { Divider } from '@nextui-org/react'

const CardSkeleton = () => {
  return (
    <div className='pulse shadow-md rounded-md bg-slate-500'>
      <div className='h-12 px-3 flex items-center'>
        <div className='flex gap-3 py-3 pulse h-2 w-20 rounded-md bg-slate-400'></div>
      </div>
      <Divider />
      <div className='px-3 h-20 flex flex-col justify-evenly'>
        <p className='pulse h-3 w-20 rounded-md bg-slate-400'></p>
        <p className='pulse h-3 w-20 rounded-md bg-slate-400'></p>
      </div>
      <Divider />
      <div className='flex gap-x-5 px-3 h-14 items-center'>
        <div className='pulse h-10 w-20 rounded-md bg-slate-400'></div>
        <div className='pulse h-10 w-20 rounded-md bg-slate-400'></div>
      </div>
    </div>
  )
}

export default CardSkeleton
