"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import EndTurnForm from "../forms/end-turn";
import useModal from "../hooks/useModal";
import { memo, useCallback } from "react";

export default memo(function EndTurn ({id, startedKm, startedAt}: {id: string, startedKm: number, startedAt: Date}) {
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const {handleAction} = useModal()
  const onPress = useCallback(() => {handleAction({id, operation: 'update'}); onOpen()}, [handleAction, id, onOpen])

  return (
    <div className="text-center">
      <Button color="danger" onPress={onPress} startContent={<LockClosedIcon />}>
        Turno
      </Button>
      <EndTurnForm {...{isOpen, onClose, onOpenChange, startedKm, startedAt}} />
    </div>
  )
})