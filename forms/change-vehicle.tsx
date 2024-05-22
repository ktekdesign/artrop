"use client"
import { Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Vehicle, VehiclesTurn } from "@prisma/client";
import { API_VEHICLESTURN_URL, API_VEHICLE_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo } from "react";
import ModalFormFooter from "../app/modal-form-footer";
import { InputNumberFormat } from "@react-input/number-format";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { getMaxKm } from "../utils/api";

const schema = yup
  .object({
    vehicleId: yup.string().required(),
    endedKm: yup.number().required(),
    startedKm: yup.number().required()
  })
  .required()

interface VehiclesTurnInit extends Pick<VehiclesTurn, "vehicleId" | "endedKm" | "startedKm"> {
  turnId?: string;
}
export default memo(function ChangeVehicleForm ({isOpen, onOpenChange, onClose, turnId, startedKm}: {isOpen: boolean, onOpenChange(): void, onClose(): void, turnId: string, startedKm: number}) {
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isHandlingMutation, onSubmit} = useSaveMutation<VehiclesTurn, VehiclesTurnInit>(API_VEHICLESTURN_URL, onClose)
  const {entities: vehicles} = useEntities<Vehicle>(API_VEHICLE_URL)
  const handleData = async (data: VehiclesTurnInit) => {
    if(!data.endedKm) return
    const min = await getMaxKm(data.vehicleId)
    if(data.startedKm < min) {
      setError("startedKm", {message: `O valor deve ser maior ou igual a ${min}`})
      return
    }
    
    if(data.endedKm < startedKm) {
      setError("endedKm", {message: `A kilometragem final não pode ser menor a kilometragem inicial que é ${startedKm}`})
      return
    }
    return onSubmit({...data, turnId})
  }
  
  return (
    <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleData)}>
          <ModalHeader className="flex flex-col gap-1">Trocar Caminhão</ModalHeader>
          <ModalBody>
            <InputNumberFormat<typeof Input> component={Input}
              locales="pt-BR"
              label="Kilometragem"
              placeholder="Digite a kilometragem final do caminhão a trocar"
              onNumberFormat={(e) => {
                clearErrors("endedKm")
                setValue("endedKm", e.detail.number)
              }}
              isInvalid={!!errors.endedKm} color={getInputColor(errors.endedKm)} errorMessage={getInputErrorMessage(errors.endedKm)} />
              <Controller
                name="vehicleId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    items={vehicles}
                    label="Veículo"
                    placeholder="Escolha o novo caminhão"
                  >
                    {(vehicle: Vehicle) => <SelectItem key={vehicle.id}>{vehicle.licence_plate_1}</SelectItem>}
                  </Select>
                )}
              />
              <InputNumberFormat<typeof Input> component={Input}
                locales="pt-BR"
                label="Kilometragem"
                onNumberFormat={(e) => {
                  clearErrors("startedKm")
                  setValue("startedKm", e.detail.number)
                }}
                placeholder="Insira a kilometragem do novo caminhão" isClearable isInvalid={!!errors.startedKm} color={getInputColor(errors.startedKm)} errorMessage={getInputErrorMessage(errors.startedKm)} />
              <ModalFormFooter isLoading={isHandlingMutation} buttonLabel="Trocar" handleClose={onClose} />
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
})