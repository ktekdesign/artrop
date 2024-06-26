"use client"
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import StartTurnForm from "../forms/start-turn";
import useModal from "../hooks/useModal";
import { memo, useCallback } from "react";

export default memo(function StartTurn () {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {handleAction} = useModal()
  
  const onPress = useCallback(() => {
    handleAction({operation: "insert"});
    onOpen()
  }, [handleAction, onOpen])

  return (
    <div className="text-center">
      <Button color="success" onPress={onPress} endContent={<RocketLaunchIcon />}>
        Iniciar Turno
      </Button>
      <StartTurnForm {...{isOpen, onClose, onOpenChange}} />
    </div>
  )
})