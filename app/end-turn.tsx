"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import EndTurnForm from "../forms/end-turn";
import useModal from "../hooks/useModal";
import useOperation from "../hooks/useOperation";

export default function EndTurn () {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {handleAction} = useModal()
  const {id} = useOperation()
  
  return (
    <div className="text-center">
      <Button color="danger" onPress={() => {handleAction({id, operation: 'update'}); onOpen()}} endContent={<LockClosedIcon />}>
        Finalizar Turno
      </Button>
      <EndTurnForm {...{isOpen, onClose, onOpenChange}} />
    </div>
  )
}