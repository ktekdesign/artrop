import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { API_TRAVEL_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";
import { errorMessage } from "../utils/input-errors";
import { Travel } from "@prisma/client";
import useSaveMutation from "../hooks/useSaveMutation";
import { getVars } from "../utils/getVars";

const schema = yup
  .object({
    weight: yup.number().required(errorMessage.generic.required)
  })
  .required()

interface Weight {
  weight: number,
  operationId?: string
}
export default function WeightForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const url = API_TRAVEL_URL
  const {isHandlingMutation, onSubmit} = useSaveMutation<Travel, Weight>({url, onClose})
  const {operation} = useOperation()
  const {operationId} = getVars(operation)
  
  if(!operationId) return
  
  const handleData = (data: Weight) => onSubmit({...data, operationId})

  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleData)}>
              <ModalHeader className="flex flex-col gap-1">Informe o Peso</ModalHeader>
              <ModalBody>
                  <Input type="number" {...register("weight")} label="Peso" placeholder="Informe o peso da carga" />
                  <p>{errors.weight?.message}</p>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Fechar
                    </Button>
                    <Button type="submit" color="primary" isLoading={isHandlingMutation}>
                      Enviar
                    </Button>
                  </ModalFooter>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
  )
}