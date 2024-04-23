import { Button } from "@nextui-org/react";
import useModal from "../hooks/useModal";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function AddButton () {
  const {onOpen, handleAction} = useModal()
  
  return <Button size="lg" color="success" className="z-10 p-2 text-white" isIconOnly onPress={() => {handleAction({operation: "insert"}); onOpen()}} endContent={<PlusIcon />} />
      
}