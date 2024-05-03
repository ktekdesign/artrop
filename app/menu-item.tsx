import { Link, NavbarItem } from "@nextui-org/react"
import { ReactNode, memo } from "react"

const MenuItem = ({name, href, pathname}: {name?: string, href?: string, pathname?: string}): ReactNode => (
  <NavbarItem isActive={href === pathname}>
    <Link color="foreground"
      href={href === pathname ? "#" : href}
    >
      {name}
    </Link>
  </NavbarItem>
)

export default memo(MenuItem)