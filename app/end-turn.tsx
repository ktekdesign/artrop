"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Icon } from "@tremor/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import { Turn } from "@prisma/client";
import { useState } from "react";
import useToast from "../hooks/useToast";
import { API_TURN_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";

const schema = yup
  .object({
    endedKm: yup.number().required()
  })
  .required()

interface TurnEnd extends Omit<Turn, "id" | "userId" | "startedAt" | "endedAt" | "startedKm" | "vehicleId" | "customerId" | "status"> {
  endedAt?: string;
  status?: boolean;
}
export default function EndTurn () {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const {handleToast} = useToast()
  const {operation: {turnId: id}, setOperation} = useOperation()
  const url = API_TURN_URL
  const action = {id, operation: "update"}

  const handleData = (data: TurnEnd) => {
    data.endedAt = (new Date).toISOString()
    data.status = true
    return data
  }

  const onSubmit = async (data: TurnEnd) => {
    const response = await submit(setIsLoading, handleToast, onClose, {url, data: handleData(data), action})
    if(response) {
      onClose()
      setOperation({})
    }
  }
  
  return (
    <>
      <div className="text-center">
        <Button color="danger" onPress={onOpen}>
          Finalizar Turno <Icon icon={LockClosedIcon} />
        </Button>
      </div>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Encerrar turno</ModalHeader>
              <ModalBody>
                  <Input type="number" {...register("endedKm")} label="Kilometragem do vehiculo" placeholder="Insira a kilometragem para finalisar o turno" />
                  <p>{errors.endedKm?.message}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="primary" isLoading={isLoading}>
                  Encerrar
                </Button>
              </ModalFooter>
              </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}