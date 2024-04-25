import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { API_TRAVEL_URL, API_TURN_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";
import { errorMessage } from "../utils/input-errors";
import { Travel } from "@prisma/client";
import useEntity from "../hooks/useEntity";
import { useQueryClient } from 'react-query';
import { useEffect } from "react";

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

  const queryClient = useQueryClient();
  const url = API_TRAVEL_URL
  const {saveMutation} = useEntity<Travel, Weight>({url})
  const {id: operationId} = useOperation()
  
  const onSubmit = async (data: Weight) => {
    saveMutation.mutate({...data, operationId})
  }

  useEffect(() => {
    if(saveMutation.isSuccess) {
      onClose()
      queryClient.invalidateQueries([API_TURN_URL]);
    }
  })
  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Informe o Peso</ModalHeader>
              <ModalBody>
                  <Input type="number" {...register("weight")} label="Peso" placeholder="Informe o peso da carga" />
                  <p>{errors.weight?.message}</p>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Fechar
                    </Button>
                    <Button type="submit" color="primary" isLoading={saveMutation.isLoading}>
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