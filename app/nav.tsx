'use client';

import { memo, useCallback } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, NavbarMenuToggle, NavbarMenu, Link} from "@nextui-org/react";

import { signOut } from 'next-auth/react';
import TurnButton from './turn-button';
import useTurn from '../hooks/useTurn';
import Operation from './operation';
import useNav from '../hooks/useNav';
import MapComponent from './map-component';
import MenuItem from './menu-item';
import { Navigation } from '../interfaces';
import { usePathname } from 'next/navigation';
import NavMenuItem from './nav-menu-item';
import useModal from '../hooks/useModal';
import EntityModal from './entity-modal';
import UserTabs from '../forms/user-tabs';
import { API_USER_URL } from '../utils/constants';
import { Role } from '@prisma/client';

export default memo(function Nav() {
  const pathname = usePathname();
  const { navigation, isMenuOpen, toggleMenu, userId, role } = useNav()
  const { id, operation, isSuccess, startedAt, vehiclesTurn } = useTurn()
  const startedKm = vehiclesTurn?.find(v => v.startedKm && !v.endedKm)?.startedKm ?? 0
  const {onOpen, handleAction} = useModal()
  const handleUser = useCallback(() => {
    handleAction({id: userId, operation: 'update'})
    onOpen()
  }, [handleAction, onOpen, userId])

  const handleSignOut = () => {
    signOut()
  }

  return (
    <>
      <Operation operation={operation} turnId={id} />
      <Navbar isBordered onMenuOpenChange={toggleMenu} maxWidth="full" className='header'>
        <NavbarBrand className="flex flex-grow-0 items-center">
          <Link href='/' className='text-xl font-bold text-black'>
          ARTROP
          </Link>
          {role === Role.ADMIN && 
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden ml-4 h-6"
            />
          }
        </NavbarBrand>
        {role === Role.ADMIN && 
          <NavbarContent className="hidden md:-my-px md:ml-4 md:flex md:space-x-4" justify='start'>
            <MapComponent<Navigation> items={navigation}>
              <MenuItem pathname={pathname} />
            </MapComponent>
          </NavbarContent>
        }
        <NavbarContent className='gap-1 md:gap-2' justify="end">
          <NavbarItem>
            <TurnButton id={id} operationId={operation?.operationId} isSuccess={isSuccess} startedKm={startedKm} startedAt={startedAt} />
          </NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger className='h-10 w-10'>
                <Button className="flex rounded-full px-0 bg-white justify-end min-w-0">
                  <span className="sr-only">Open user menu</span>
                  <div className='h-10 w-10 rounded-full shadow bg-black'></div>
                </Button> 
              </DropdownTrigger>
            </NavbarItem>
            {role === Role.ADMIN ?
            <DropdownMenu
              aria-label="Authentication"
              className="absolute left-0 z-40 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="logout"
                className={'flex w-full px-4 py-2 text-sm text-gray-700'}
                onClick={handleSignOut}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
            :
            <DropdownMenu
              aria-label="Authentication"
              className="absolute left-0 z-40 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="update"
                className={'flex w-full px-4 py-2 text-sm text-gray-700'}
                onClick={handleUser}
              >
                Editar meu perfil
              </DropdownItem>
              <DropdownItem
                key="logout"
                className={'flex w-full px-4 py-2 text-sm text-gray-700'}
                onClick={handleSignOut}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          }
          </Dropdown>  
        </NavbarContent>
        <NavbarMenu>
          <MapComponent<Navigation> items={navigation}>
            <NavMenuItem pathname={pathname} />
          </MapComponent>
        </NavbarMenu>
      </Navbar>
      {role === Role.DRIVER && 
        <EntityModal url={API_USER_URL}>
          <UserTabs />
        </EntityModal>
      }
    </>
  );
})
