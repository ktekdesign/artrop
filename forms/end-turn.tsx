"use client"
import { Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Turn } from "@prisma/client";
import { API_TURN_URL } from "../utils/constants";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo } from "react";
import ModalFormFooter from "../app/modal-form-footer";
import { InputNumberFormat } from "@react-input/number-format";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";

const schema = yup
  .object({
    endedKm: yup.number().required()
  })
  .required()

  interface TurnRegister {
    endedKm: number;
    startedAt?: Date
  }
export default memo(function EndTurnForm ({isOpen, onOpenChange, onClose, startedKm, startedAt}: {isOpen: boolean, onOpenChange(): void, onClose(): void, startedAt: Date, startedKm: number}) {
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    setError
  } = useForm({
    resolver: yupResolver(schema),
  })
  const {isHandlingMutation, onSubmit} = useSaveMutation<Turn, TurnRegister>(API_TURN_URL, onClose)
  const handleData = async (data: TurnRegister) => {
    if(!data.endedKm) return
    if(data.endedKm < startedKm) {
      setError("endedKm", {message: `A kilometragem final não pode ser menor a kilometragem inicial que é ${startedKm}`})
      return
    }
    return onSubmit({...data, startedAt})
  }
  return (
    <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleData)}>
          <ModalHeader className="flex flex-col gap-1">Encerrar turno</ModalHeader>
          <ModalBody>
            <InputNumberFormat<typeof Input> component={Input}
              locales="pt-BR"
              label="Kilometragem"
              placeholder="Digite a kilometragem final"
              onNumberFormat={(e) => {
                clearErrors("endedKm")
                setValue("endedKm", e.detail.number)
              }}
              isInvalid={!!errors.endedKm} color={getInputColor(errors.endedKm)} errorMessage={getInputErrorMessage(errors.endedKm)} />
          </ModalBody>
          <ModalFormFooter isLoading={isHandlingMutation} buttonLabel="Encerrar" handleClose={onClose} />
        </form>
      </ModalContent>
    </Modal>
  )
})