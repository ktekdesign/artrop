import { Button, useDisclosure } from "@nextui-org/react";
import WeightForm from "../forms/weight";
import { MegaphoneIcon } from "@heroicons/react/24/solid";
import useOperation from "../hooks/useOperation";
import useModal from "../hooks/useModal";

export default function WeightButton ({condition}: {condition: boolean}) {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {operation} = useOperation() || {}
  const {handleAction} = useModal()
  
  if(!operation?.length || !operation[0].travel?.length ) return
  
  const onPress = () => {
    handleAction({id: operation[0].travel[0].id, operation: 'update'});
    onOpen();
  }
  
  if(!condition || operation[0].travel[0].weight) return

  return (
    <div className="text-center">
      <Button size="lg" color="danger" onPress={onPress} endContent={<MegaphoneIcon />}>
        Informar Peso
      </Button>
      <WeightForm {...{isOpen, onOpenChange, onClose}} />
    </div>
  )
}