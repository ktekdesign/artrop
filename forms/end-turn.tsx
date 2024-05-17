"use client"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Turn } from "@prisma/client";
import { API_TURN_URL } from "../utils/constants";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo } from "react";
import ModalFormFooter from "../app/modal-form-footer";
import { transformNumber } from "../utils/transform";
import NumberInput from "../app/number-input";

const schema = yup
  .object({
    endedKm: yup.number().transform(value => transformNumber(value)).required()
  })
  .required()

export default memo(function EndTurnForm ({isOpen, onOpenChange, onClose, startedKm}: {isOpen: boolean, onOpenChange(): void, onClose(): void, startedAt?: Date, startedKm: number}) {
  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const {isHandlingMutation, onSubmit} = useSaveMutation<Turn, Pick<Turn, "endedKm">>(API_TURN_URL, onClose)

  return (
    <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader className="flex flex-col gap-1">Encerrar turno</ModalHeader>
          <ModalBody>
            <NumberInput 
              label="Kilometragem"
              {...register("endedKm")}
              min={startedKm}
              placeholder="Digite a kilometragem final"
            />
          </ModalBody>
          <ModalFormFooter isLoading={isHandlingMutation} buttonLabel="Encerrar" handleClose={onClose} />
        </form>
      </ModalContent>
    </Modal>
  )
})