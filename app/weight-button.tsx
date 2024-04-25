import { Button, useDisclosure } from "@nextui-org/react";
import WeightForm from "../forms/weight";
import { MegaphoneIcon } from "@heroicons/react/24/solid";
import useOperation from "../hooks/useOperation";
import useModal from "../hooks/useModal";

export default function WeightButton ({condition}: {condition: boolean}) {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {travel} = useOperation()
  const {handleAction} = useModal()
  
  const onPress = () => {
    handleAction({id: travel?.id, operation: 'update'});
    onOpen();
  }
  
  if(!condition || travel?.weight) return

  return (
    <div className="text-center">
      <Button size="lg" color="danger" onPress={onPress} endContent={<MegaphoneIcon />}>
        Informar Peso
      </Button>
      <WeightForm {...{isOpen, onOpenChange, onClose}} />
    </div>
  )
}