"use client"
import { BoltIcon } from "@heroicons/react/24/solid";
import { Button, useDisclosure } from "@nextui-org/react";
import useOperation from "../hooks/useOperation";
import StartOperationForm from "../forms/start-operation";
import useModal from "../hooks/useModal";

export default function StartOperation () {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {handleAction} = useModal()

  return (
      <div className="text-center">
        <Button size="lg" color="success" onPress={() => {handleAction({operation: "insert"}); onOpen()}} endContent={<BoltIcon />}>
          Iniciar Operação
        </Button>
        <StartOperationForm {...{isOpen, onOpenChange, onClose}} />
      </div>
  )
}