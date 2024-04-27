import { Button, useDisclosure } from "@nextui-org/react";
import WeightForm from "../forms/weight";
import { MegaphoneIcon } from "@heroicons/react/24/solid";
import useOperation from "../hooks/useOperation";
import useModal from "../hooks/useModal";
import { getVars } from "../utils/getVars";

export default function WeightButton ({condition}: {condition: boolean}) {
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {operation} = useOperation()
  const {operationId, id, weight} = getVars(operation)
  const {handleAction} = useModal()
  
  if(!operationId || !id ) return
  
  const onPress = () => {
    handleAction({id, operation: 'update'});
    onOpen();
  }
  
  if(!condition || weight) return

  return (
    <div className="text-center">
      <Button size="lg" color="danger" onPress={onPress} endContent={<MegaphoneIcon />}>
        Informar Peso
      </Button>
      <WeightForm {...{isOpen, onOpenChange, onClose}} />
    </div>
  )
}