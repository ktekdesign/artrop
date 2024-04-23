"use client"
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import StartTurnForm from "../forms/start-turn";
import useModal from "../hooks/useModal";

export default function StartTurn () {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {handleAction} = useModal()
  
  return (
    <div className="text-center">
      <Button color="success" onPress={() => {handleAction({operation: 'insert'}); onOpen()}} endContent={<RocketLaunchIcon />}>
        Iniciar Turno
      </Button>
      <StartTurnForm {...{isOpen, onClose, onOpenChange}} />
    </div>
  )
}