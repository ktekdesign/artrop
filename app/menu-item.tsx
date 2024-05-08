import { Link, NavbarItem } from "@nextui-org/react"
import { memo } from "react"
import DropdownMenu from "./dropdown-menu"
import { Navigation } from "../interfaces"

interface Props extends Navigation {
  pathname?: string
}

const MenuItem = ({name, href, items, pathname}: Props) => (
  items ? 
    <DropdownMenu {...{name, href, items}} />
  :
    <NavbarItem isActive={href === pathname}>
      <Link color="foreground"
        href={href === pathname ? "#" : href}
      >
        {name}
      </Link>
    </NavbarItem>
)

export default memo(MenuItem)