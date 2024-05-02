import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { Status } from "@prisma/client";
import { memo } from "react";

const schema = yup
  .object({
    weight_load: yup.number(),
    weight_unload: yup.number()
  })
  .required()

export interface Weight {
  weight_load?: number,
  operationId?: string
  weight_unload?: number,
  status?: Status
}

export default memo(function WeightForm ({isOpen, onOpenChange, onClose, field, handleWeight, isHandlingMutation}: {isOpen: boolean, onOpenChange(): void, onClose(): void, field: string, handleWeight: (data: Weight) => void, isHandlingMutation: boolean}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  if(field !== "weight_load" && field !== "weight_unload") return
  
  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleWeight)}>
            <ModalHeader className="flex flex-col gap-1">Informe o Peso</ModalHeader>
            <ModalBody>
              <Input type="number" {...register(field)} label="Peso" placeholder="Informe o peso" isClearable isInvalid={!!errors[field]} color={getInputColor(errors[field])} errorMessage={getInputErrorMessage(errors[field])} />
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="primary" isLoading={isHandlingMutation}>
                  Enviar
                </Button>
              </ModalFooter>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
  )
})