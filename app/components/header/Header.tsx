'use client'
import React, { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button, Link, Avatar } from '@nextui-org/react'
import clsx from 'clsx'
import { link as linkStyles } from '@nextui-org/theme'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/solid'
import NextLink from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'
import EditAddForm from '../EditAddForm'
import ModalButton from '../button/ModalButton'
import { useRestaurantCRUD } from '../../api/restaurantCRUD'
import { SupportedModalButtonTypes } from '../../../interface'

export const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Vote', href: '#' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUser()
  const { sendCreateRestaurantRequest } = useRestaurantCRUD()

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
            <NextLink className={clsx(linkStyles({ color: 'foreground' }), 'data-[active=true]:text-primary data-[active=true]:font-medium')} href={item.href}>
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
        <NavbarItem>
          <ModalButton
            buttonPurpose={SupportedModalButtonTypes.CREATE_RESTAURANT}
            buttonText='Create'
            modalContent={<EditAddForm onSubmit={sendCreateRestaurantRequest} />}
            modalHeaderText='Create new'
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end'>
        {!user.isLoading && (
          <NavbarItem>
            {user.user ? (
              <div className='flex items-center'>
                {user.user.picture && <Avatar name={user.user?.name?.toString()} src={user.user?.picture} />}
                <p className='mr-2 ml-2'>{user.user.name}</p>
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
