import { Button, useDisclosure } from "@heroui/react";
import WeightForm, { Weight } from "../forms/weight";
import { MegaphoneIcon } from "@heroicons/react/24/solid";
import { memo } from "react";

export default memo(function WeightButton ({field, handleWeight, isHandlingMutation}: {field: string, handleWeight: (data: Weight) => void, isHandlingMutation: boolean}) {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  
  return (
    <div className="text-center">
      <Button size="lg" color="danger" onPress={onOpen} endContent={<MegaphoneIcon />}>
        Informar Peso
      </Button>
      <WeightForm {...{isOpen, onOpenChange, onClose, field, handleWeight, isHandlingMutation}} />
    </div>
  )
})