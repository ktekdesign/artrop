import { Button } from "@heroui/react";
import useModal from "../hooks/useModal";
import { MinusIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { memo } from "react";

export default memo(function ActionsButton ({id}: {id?: string}) {
  const {onOpen, handleAction} = useModal()
  return (
    <span className="flex gap-4">
      <Button isIconOnly className="p-2" color="warning" onPress={() => {handleAction({id, operation: 'update'}); onOpen()}} endContent={<PencilSquareIcon />} />
      <Button isIconOnly className="p-2" color="danger" onPress={() => {handleAction({id, operation: 'delete'}); onOpen()}} endContent={<MinusIcon />} />
    </span>
  )
})