import { Link, NavbarMenuItem } from "@nextui-org/react"
import { memo } from "react"
import { Navigation } from "../interfaces"
import DropdownMenu from "./dropdown-menu"

interface Props extends Navigation {
  pathname?: string
}

const NavMenuItem = ({name, href, pathname, items}: Props) => (
  items ?
    <DropdownMenu {...{name, href, items}} />
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