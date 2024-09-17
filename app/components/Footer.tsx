'use client'
import Link from 'next/link'
import { menuItems } from './header/Header'

const Footer = () => {
  return (
    <footer className='p-10 bg-yellow-500 flex flex-col gap-y-4'>
      {menuItems.map((menuPoint) => (
        <Link href={menuPoint.href} className='text-white' key={menuPoint.href}>
          {menuPoint.label}
        </Link>
      ))}
    </footer>
  )
}

export default Footer
