"use client"
import { BoltIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import StartOperationForm from "../forms/start-operation";
import useModal from "../hooks/useModal";

export default function StartOperation () {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {handleAction} = useModal()

  const onPress = () => {
    handleAction({operation: "insert"});
    onOpen()
  }

  return (
      <div className="text-center">
        <Button size="lg" color="success" onPress={onPress} endContent={<BoltIcon />}>
          Iniciar Operação
        </Button>
        <StartOperationForm {...{isOpen, onOpenChange, onClose}} />
      </div>
  )
}