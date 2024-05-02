"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import EndTurnForm from "../forms/end-turn";
import useModal from "../hooks/useModal";
import { memo } from "react";

export default memo(function EndTurn ({id}: {id: string}) {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {handleAction} = useModal()
  const onPress = () => {handleAction({id, operation: 'update'}); onOpen()}

  return (
    <div className="text-center">
      <Button color="danger" onPress={onPress} endContent={<LockClosedIcon />}>
        Finalizar Turno
      </Button>
      <EndTurnForm {...{isOpen, onClose, onOpenChange}} />
    </div>
  )
})