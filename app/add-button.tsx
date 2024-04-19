import { Button } from "@nextui-org/react";
import useModal from "../hooks/useModal";
import { Icon } from "@tremor/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

export default function AddButton () {
  const {onOpen, handleAction} = useModal()
  
  return <div className="w-full bottom-5 text-center z-10"><Button isIconOnly onPress={() => {handleAction({operation: "insert"}); onOpen()}}><Icon icon={UserPlusIcon} /></Button></div>
      
}