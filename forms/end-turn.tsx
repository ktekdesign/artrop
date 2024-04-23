"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Turn } from "@prisma/client";
import { API_TURN_URL } from "../utils/constants";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";
import useEntity from "../hooks/useEntity";
import { useQueryClient } from 'react-query';
import { useEffect } from "react";

const schema = yup
  .object({
    endedKm: yup.number().required()
  })
  .required()

interface TurnEnd extends Omit<Turn, "id" | "userId" | "startedAt" | "endedAt" | "startedKm" | "vehicleId" | "customerId" | "status"> {
  endedAt?: string;
  status?: boolean;
}
export default function EndTurnForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const url = API_TURN_URL
  const queryClient = useQueryClient();
  const {saveMutation} = useEntity<Turn, TurnEnd>({url})
  
  const handleData = (data: TurnEnd) => {
    data.endedAt = (new Date()).toISOString()
    data.status = true
    return data
  }

  const onSubmit = async (data: TurnEnd) => saveMutation.mutate(handleData(data))
 
  useEffect(() => {
    if(saveMutation.isSuccess) {
      onClose()
      queryClient.invalidateQueries([`${API_TURN_URL}open`]);
    }
  })
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {() => (
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader className="flex flex-col gap-1">Encerrar turno</ModalHeader>
            <ModalBody>
              <Input type="number" {...register("endedKm")} label="Kilometragem do vehiculo" placeholder="Insira a kilometragem para finalisar o turno" isClearable isInvalid={!!errors.endedKm} color={getInputColor(errors.endedKm)} errorMessage={getInputErrorMessage(errors.endedKm)} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fechar
              </Button>
              <Button type="submit" color="primary" isLoading={saveMutation.isLoading}>
                Encerrar
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  )
}