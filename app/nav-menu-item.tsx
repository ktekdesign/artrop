import { Link, NavbarMenuItem } from "@heroui/react"
import { memo } from "react"
import { Navigation } from "../interfaces"
import DropdownMenu from "./dropdown-menu"

interface Props extends Navigation {
  pathname?: string
}

const NavMenuItem = ({name, href, pathname, items}: Props) => (
  items ?
    <DropdownMenu {...{name, href, items, pathname, key: 0}} />
  :
    <NavbarMenuItem isActive={href === pathname}>
      <Link color="foreground"
        href={href === pathname ? "#" : href}
      >
        {name}
      </Link>
    </NavbarMenuItem>
)

export default memo(NavMenuItem)