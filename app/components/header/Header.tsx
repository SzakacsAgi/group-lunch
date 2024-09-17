'use client'
import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from '@nextui-org/react'
import clsx from 'clsx'
import { link as linkStyles } from '@nextui-org/theme'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'

export const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Vote', href: '#' },
]
import NextLink from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import Image from 'next/image'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUser()

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='sm:hidden' />
        <NavbarBrand>
          <p className='font-bold text-inherit'>GROUP LUNCH</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink className={clsx(linkStyles({ color: 'foreground' }), 'data-[active=true]:text-primary data-[active=true]:font-medium')} href='/'>
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        {!user.isLoading && (
          <NavbarItem>
            {user.user ? (
              <div className='flex items-center'>
                {user.user.picture && (
                  <Image src={user.user.picture} alt='A picture about the user' width={100} height={100} className='w-8 rounded-full mr-2' />
                )}
                <p className='mr-2'>{user.user.name}</p>
                <Link href='/api/auth/logout' aria-current='page'>
                  <ArrowLeftStartOnRectangleIcon className='w-5 rotate-180 text-red-500 cursor-pointer' />
                </Link>
              </div>
            ) : (
              <Button as={Link} color='primary' href='/api/auth/login' variant='flat'>
                Login
              </Button>
            )}
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item) => (
          <NavbarMenuItem key={`${item.label}`}>
            <Link className='w-full' href={item.href} size='lg'>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default Header