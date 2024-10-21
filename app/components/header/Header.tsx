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
import { useRestaurantOperations } from '../../api/useRestaurantOperations'
import { RestaurantData, SupportedModalButtonTypes } from '../../../interface'
import { useFileOperations } from '../../api/useFileOperations'
import { useRecoilState } from 'recoil'
import { uploadedImageTrash } from '../../../utils/atoms'

export const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Vote', href: '/vote' },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useUser()
  const { sendCreateRestaurantRequest } = useRestaurantOperations()
  const { deleteFile } = useFileOperations()

  const [uploadedImageId, setUploadedImageId] = useRecoilState(uploadedImageTrash)

  const deleteUploadedFileOnClose = async () => {
    try {
      if (uploadedImageId) {
        await deleteFile(uploadedImageId)
      }
      setUploadedImageId(null)
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnSubmit = async (data: RestaurantData, restId: string, imageId?: string) => {
    await sendCreateRestaurantRequest(data, restId, imageId)
    setUploadedImageId(null)
  }

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='static shadow-md'>
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
            modalContent={<EditAddForm onSubmit={handleOnSubmit} />}
            modalHeaderText='Create new'
            handleOnClose={deleteUploadedFileOnClose}
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
