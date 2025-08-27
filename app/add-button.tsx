import { Button } from "@heroui/react";
import useModal from "../hooks/useModal";
import { PlusIcon } from "@heroicons/react/24/solid";
import { memo } from "react";

export default memo(function AddButton () {
  const {onOpen, handleAction} = useModal()
  
  return <Button size="lg" color="success" className="z-10 p-2 text-white" isIconOnly onPress={() => {handleAction({operation: "insert"}); onOpen()}} endContent={<PlusIcon />} />
      
})