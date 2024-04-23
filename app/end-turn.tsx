"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import EndTurnForm from "../forms/end-turn";
import useModal from "../hooks/useModal";

export default function EndTurn ({id}: {id?: string}) {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {handleAction} = useModal()
  
  return (
    <div className="text-center">
      <Button color="danger" onPress={() => {handleAction({id, operation: 'update'}); onOpen()}} endContent={<LockClosedIcon />}>
        Finalizar Turno
      </Button>
      <EndTurnForm {...{isOpen, onClose, onOpenChange}} />
    </div>
  )
}