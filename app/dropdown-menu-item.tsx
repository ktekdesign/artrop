import { DropdownItem, Link } from "@nextui-org/react"
import { memo } from "react"
import { Navigation } from "../interfaces"

const DropdownMenuItem = ({name, href}: Navigation) => {
  return (
  <DropdownItem
    key={name}
    className={'flex w-full px-4 py-2 text-sm text-gray-700'}
    href={href}
  >
      {name}
  </DropdownItem>
)
  }
export default memo(DropdownMenuItem)