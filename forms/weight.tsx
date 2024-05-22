import { Input, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Status } from "@prisma/client";
import { memo } from "react";
import ModalFormFooter from "../app/modal-form-footer";
import { InputNumberFormat } from "@react-input/number-format";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";

const schema = yup
  .object({
    weight_load: yup.number(),
    weight_unload: yup.number()
  })
  .required()

export interface Weight {
  weight_load?: number,
  weight_unload?: number,
  status?: Status
}

export default memo(function WeightForm ({isOpen, onOpenChange, onClose, field, handleWeight, isHandlingMutation}: {isOpen: boolean, onOpenChange(): void, onClose(): void, field: string, handleWeight: (data: Weight) => void, isHandlingMutation: boolean}) {
  const {
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })

  if(field !== "weight_load" && field !== "weight_unload") return
  
  return (
    <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleWeight)}>
          <ModalHeader className="flex flex-col gap-1">Informe o Peso</ModalHeader>
          <ModalBody>
            <InputNumberFormat<typeof Input> component={Input} label="Peso"
              locales="pt-BR"
              maximumIntegerDigits={5}
              placeholder="Informe o peso"
              onNumberFormat={(e) => setValue(field, e.detail.number)}
              isInvalid={!!errors[field]} color={getInputColor(errors[field])} errorMessage={getInputErrorMessage(errors[field])} />
          </ModalBody>
          <ModalFormFooter buttonLabel="Enviar" isLoading={isHandlingMutation} handleClose={onClose} />
        </form>
      </ModalContent>
    </Modal>
  )
})