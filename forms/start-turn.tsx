"use client"
import { Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Customer, Turn, Vehicle } from "@prisma/client";
import { API_CUSTOMER_URL, API_TURN_URL, API_VEHICLE_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo } from "react";
import ModalFormFooter from "../app/modal-form-footer";
import { InputNumberFormat } from "@react-input/number-format";
import { getMaxKm } from "../utils/api";

const schema = yup
  .object({
    startedKm: yup.number().required(),
    vehicleId: yup.string().required(),
    customerId: yup.string().required()
  })
  .required()

interface TurnInit extends Pick<Turn, "customerId"> {
  userId?: string;
  vehicleId: string;
  startedKm: number;
}

export default memo(function StartTurnForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void}) {
  const {
    handleSubmit,
    setValue,
    control,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isHandlingMutation, onSubmit} = useSaveMutation<Turn, TurnInit>(API_TURN_URL, onClose)
  
  const {entities: customers} = useEntities<Customer>(API_CUSTOMER_URL)
  const {entities: vehicles} = useEntities<Vehicle>(API_VEHICLE_URL)
  const handleData = async (data: TurnInit) => {
    const min = await getMaxKm(data.vehicleId)
    if(data.startedKm < min) return setError("startedKm", {message: `O valor deve ser maior ou igual a ${min}`})
    return onSubmit(data)
  }
  return (
      <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleData)}>
              <ModalHeader className="flex flex-col gap-1">Iniciar turno</ModalHeader>
              <ModalBody>
                  <Controller
                    name="customerId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        items={customers}
                        label="Cliente"
                        placeholder="Escolha o Cliente"
                      >
                        {(customer: Customer) => <SelectItem key={customer.id}>{customer.name}</SelectItem>}
                      </Select>
                    )}
                  />
                  <Controller
                    name="vehicleId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        items={vehicles}
                        label="Veículo"
                        onSelectionChange={() => clearErrors("startedKm")}
                        placeholder="Escolha o Veículo"
                      >
                        {(vehicle: Vehicle) => <SelectItem key={vehicle.id}>{vehicle.licence_plate_1}</SelectItem>}
                      </Select>
                    )}
                  />
                  <InputNumberFormat<typeof Input> component={Input}
                    locales="pt-BR"
                    label="Kilometragem do Veículo"
                    onNumberFormat={(e) => {
                      clearErrors("startedKm")
                      setValue("startedKm", e.detail.number)
                    }}
                    placeholder="Insira a kilometragem para iniciar o turno" isClearable isInvalid={!!errors.startedKm} color={getInputColor(errors.startedKm)} errorMessage={getInputErrorMessage(errors.startedKm)} />
                  <ModalFormFooter isLoading={isHandlingMutation} buttonLabel="Iniciar" handleClose={onClose} />
              </ModalBody>
            </form>
        </ModalContent>
      </Modal>
  )
})