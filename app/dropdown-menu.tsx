import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem } from "@heroui/react"
import { memo } from "react"
import { Navigation } from "../interfaces"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

const CustomDropdownMenu = ({name, items}: Navigation) => (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Button
            className="p-0 bg-transparent data-[hover=true]:bg-transparent text-medium flex items-center gap-1"
            endContent={<ChevronDownIcon />}
            radius="sm"
            variant="light"
          >
            {name}
          </Button>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label={name}
        className="absolute right-0 z-20 mt-8 w-48 origin-center-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        itemClasses={{
          base: "gap-4",
        }}
        items={items}
      >
        {(item) => (
          <DropdownItem
            key={item.key || 0}
            className={'flex w-full px-4 py-2 text-sm text-gray-700'}
            href={item.href}
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )

export default memo(CustomDropdownMenu)