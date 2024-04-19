import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import { Dispatch, SetStateAction, useState } from "react";
import useToast from "../hooks/useToast";
import { API_OPERATION_URL } from "../utils/constants";
import { useRouter } from "next/navigation";
import useOperation from "../hooks/useOperation";

const schema = yup
  .object({
    weight: yup.number().required()
  })
  .required()

interface Weight {
  weight: number
}
export default function WeightButton ({condition, setWeight}: {condition: boolean, setWeight: Dispatch<SetStateAction<number>>}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {handleToast} = useToast()
  const {operation: {id}} = useOperation()
  const url = API_OPERATION_URL
  const action = {id, operation: "update"}
  const handleClose = () => {
    onClose();
    router.refresh()
  }

  const onSubmit = async (data: Weight) => {
    const operation = await submit(setIsLoading, handleToast, handleClose, {url, data, action})
    if(operation) setWeight(data.weight)
  }

  if(!condition) return <></>

  return (
    <>
      <div className="text-center">
        <Button color="success" onPress={onOpen}>
          Informar Peso
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