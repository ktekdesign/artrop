import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import { useState } from "react";
import useToast from "../hooks/useToast";
import { API_TRAVEL_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";

const schema = yup
  .object({
    weight: yup.number().required()
  })
  .required()

interface Weight {
  weight: number
}
export default function VehicleButton () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const {handleToast} = useToast()
  const {operation, setOperation} = useOperation()
  const {id: operationId, travel} = operation || {}
  const id = travel?.id
  const url = API_TRAVEL_URL
  const action = {id, operation: "update"}

  const onSubmit = async (data: Weight) => {
    const response = await submit(setIsLoading, handleToast, onClose, {url, data: {...data, operationId}, action})
    if(response) {
      setOperation({...operation, travel: {id: response.id , status: response.status, weight: response.weight}})
      onClose()
    }
  }

  return (
    <>
      <div className="text-center">
        <Button color="warning" onPress={onOpen} endContent={<ArrowsRightLeftIcon />}>
          Trocar Vehiculo
        </Button>
      </div>
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
                    <Button type="submit" color="primary" isLoading={isLoading}>
                      Enviar
                    </Button>
                  </ModalFooter>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}