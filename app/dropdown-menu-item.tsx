import { DropdownItem } from "@heroui/react"
import { memo } from "react"
import { Navigation } from "../interfaces"

const DropdownMenuItem = ({name, href, key}: Navigation) => {
  return (
  <DropdownItem
    key={key || 0}
    className={'flex w-full px-4 py-2 text-sm text-gray-700'}
    href={href}
  >
      {name}
  </DropdownItem>
)
  }
export default memo(DropdownMenuItem)