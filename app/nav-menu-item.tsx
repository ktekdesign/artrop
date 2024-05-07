import { Link, NavbarMenuItem } from "@nextui-org/react"
import { ReactNode, memo } from "react"

const NavMenuItem = ({name, href, pathname}: {name?: string, href?: string, pathname?: string}): ReactNode => (
  <NavbarMenuItem isActive={href === pathname}>
    <Link color="foreground"
      href={href === pathname ? "#" : href}
    >
      {name}
    </Link>
  </NavbarMenuItem>
)

export default memo(NavMenuItem)