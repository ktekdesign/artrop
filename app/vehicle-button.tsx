import { Button, useDisclosure } from "@nextui-org/react";
import { TruckIcon } from "@heroicons/react/24/solid";
import ChangeVehicleForm from "../forms/change-vehicle";
import useModal from "../hooks/useModal";
import { memo, useCallback } from "react";

export default memo(function VehicleButton ({id, startedKm}: {id: string, startedKm: number}) {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {handleAction} = useModal()

  const onPress = useCallback(() => {
    handleAction({operation: "insert"})
    onOpen()
  }, [handleAction, onOpen])

  return (
    <>
      <Button color="warning" onPress={onPress} endContent={<TruckIcon />}>
        Trocar
      </Button>
      <ChangeVehicleForm {...{isOpen, onOpen, onOpenChange, onClose, startedKm, turnId: id}} />
    </>
  )
})