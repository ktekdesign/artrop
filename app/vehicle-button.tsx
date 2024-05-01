import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import ChangeVehicleForm from "../forms/change-vehicle";
import useModal from "../hooks/useModal";

export default function VehicleButton ({id}: {id: string}) {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const action = {operation: "insert"}
  const {handleAction} = useModal()

  const onPress = () => {
    handleAction(action)
    onOpen()
  }

  return (
    <>
      <div className="text-center">
        <Button color="warning" onPress={onPress} endContent={<ArrowsRightLeftIcon />}>
          Trocar Vehiculo
        </Button>
      </div>
      <ChangeVehicleForm {...{isOpen, onOpen, onOpenChange, onClose, turnId: id}} />
    </>
  )
}