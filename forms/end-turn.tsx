"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Turn } from "@prisma/client";
import { API_TURN_URL } from "../utils/constants";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { minutesDiff } from "../utils/transform";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo, useCallback } from "react";

const schema = yup
  .object({
    endedKm: yup.number().required()
  })
  .required()

interface TurnEnd extends Omit<Turn, "id" | "userId" | "startedAt" | "endedAt" | "startedKm" | "vehicleId" | "customerId" | "status" | "duration"> {
  endedAt?: Date;
  status?: boolean;
  duration?: number;
}
export default memo(function EndTurnForm ({isOpen, onOpenChange, onClose, startedAt}: {isOpen: boolean, onOpenChange(): void, onClose(): void, startedAt?: Date}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const url = API_TURN_URL
  const {isHandlingMutation, onSubmit} = useSaveMutation<Turn, TurnEnd>(url, onClose)
  
  const handleData = useCallback((data: TurnEnd) => {
    data.endedAt = new Date()
    data.status = true
    data.duration = minutesDiff(data.endedAt, startedAt)
    return data
  }, [startedAt])

  const handleTurn = (data: TurnEnd) => onSubmit(handleData(data))

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Encerrar turno</ModalHeader>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleTurn)}>
            <ModalBody>
              <Input type="number" {...register("endedKm")} label="Kilometragem do vehiculo" placeholder="Insira a kilometragem para finalisar o turno" isClearable isInvalid={!!errors.endedKm} color={getInputColor(errors.endedKm)} errorMessage={getInputErrorMessage(errors.endedKm)} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Fechar
              </Button>
              <Button type="submit" color="primary" isLoading={isHandlingMutation}>
                Encerrar
              </Button>
            </ModalFooter>
          </form>
      </ModalContent>
    </Modal>
  )
})