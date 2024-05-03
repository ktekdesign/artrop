import { Link, NavbarItem } from "@nextui-org/react"
import { memo } from "react"

const Menu = ({navigation, pathname, ...props}: {navigation: {name: string, href: string}[], pathname: string}) => (
  navigation.map(({name, href}) => (
    <NavbarItem key={name} isActive={pathname === href}>
      <Link color="foreground"
        href={pathname === href? "#" : href}
        {...props}
      >
        {name}
      </Link>
    </NavbarItem>
  ))
)

export default memo(Menu)