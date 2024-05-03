import { Button, useDisclosure } from "@nextui-org/react";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import ChangeVehicleForm from "../forms/change-vehicle";
import useModal from "../hooks/useModal";
import { memo, useCallback } from "react";

export default memo(function VehicleButton ({id}: {id: string}) {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {handleAction} = useModal()

  const onPress = useCallback(() => {
    handleAction({operation: "insert"})
    onOpen()
  }, [handleAction, onOpen])

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
})