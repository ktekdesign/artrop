'use client';

import { memo } from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, NavbarMenuToggle, NavbarMenu} from "@nextui-org/react";

import { signOut } from 'next-auth/react';
import TurnButton from './turn-button';
import useTurn from '../hooks/useTurn';
import Operation from './operation';
import useNav from '../hooks/useNav';
import MapComponent from './map-component';
import MenuItem from './menu-item';
import { Navigation } from '../interfaces';
import { usePathname } from 'next/navigation';

export default memo(function Nav() {
  const pathname = usePathname();
  const { navigation, isMenuOpen, toggleMenu } = useNav()
  const {id, operation, isSuccess} = useTurn()
  return (
    <>
      <Operation operation={operation} turnId={id} />
      <Navbar isBordered onMenuOpenChange={toggleMenu} maxWidth="full" className='header'>
        <NavbarBrand className="flex flex-grow-0 items-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="text-gray-100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="100%"
              height="100%"
              rx="16"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="black"
            />
          </svg>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden ml-4"
          />
        </NavbarBrand>
        <NavbarContent className="hidden md:-my-px md:ml-6 md:flex md:space-x-8" justify='start'>
          <MapComponent<Navigation> items={navigation}>
            <MenuItem pathname={pathname} />
          </MapComponent>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem><TurnButton id={id} operationId={operation?.operationId} isSuccess={isSuccess} /></NavbarItem>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger className='h-10 w-10'>
                <Button className="flex rounded-full px-0 bg-white justify-end min-w-0">
                  <span className="sr-only">Open user menu</span>
                  <div className='h-10 w-10 rounded-full shadow bg-black'></div>
                </Button> 
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Authentication"
              className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="logout"
                className={'flex w-full px-4 py-2 text-sm text-gray-700'}
                onClick={() => signOut()}
              >
                Sair
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>  
        </NavbarContent>
        <NavbarMenu>
          <MapComponent<Navigation> items={navigation}>
            <MenuItem pathname={pathname} />
          </MapComponent>
        </NavbarMenu>
      </Navbar>
    </>
  );
})
