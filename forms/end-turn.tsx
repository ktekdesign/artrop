"use client"
import { Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Turn } from "@prisma/client";
import { API_TURN_URL } from "../utils/constants";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo } from "react";
import ModalFormFooter from "../app/modal-form-footer";
import { transformNumber } from "../utils/transform";

const schema = yup
  .object({
    endedKm: yup.number().transform(value => transformNumber(value)).required()
  })
  .required()

export default memo(function EndTurnForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void, startedAt?: Date}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isHandlingMutation, onSubmit} = useSaveMutation<Turn, Pick<Turn, "endedKm">>(API_TURN_URL, onClose)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">Encerrar turno</ModalHeader>
          <ModalBody>
            <Input type="number" {...register("endedKm")} label="Kilometragem do vehiculo" placeholder="Insira a kilometragem para finalisar o turno" isClearable isInvalid={!!errors.endedKm} color={getInputColor(errors.endedKm)} errorMessage={getInputErrorMessage(errors.endedKm)} />
          </ModalBody>
          <ModalFormFooter isLoading={isHandlingMutation} buttonLabel="Encerrar" handleClose={onClose} />
        </form>
      </ModalContent>
    </Modal>
  )
})