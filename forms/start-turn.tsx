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

const schema = yup
  .object({
    startedKm: yup.number().required(),
    vehicleId: yup.string().required(),
    customerId: yup.string().required()
  })
  .required()

interface TurnInit extends Pick<Turn, "startedKm" | "customerId"> {
  userId?: string;
  vehicleId?: string;
}

export default memo(function StartTurnForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isHandlingMutation, onSubmit} = useSaveMutation<Turn, TurnInit>(API_TURN_URL, onClose)
  
  const {entities: customers} = useEntities<Customer>(API_CUSTOMER_URL)
  const {entities: vehicles} = useEntities<Vehicle>(API_VEHICLE_URL)

  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
                        label="Vehiculo"
                        placeholder="Escolha o Vehiculo"
                      >
                        {(vehicle: Vehicle) => <SelectItem key={vehicle.id}>{vehicle.licence_plate_1}</SelectItem>}
                      </Select>
                    )}
                  />
                  <Input type="number" {...register("startedKm")} label="Kilometragem do vehiculo" placeholder="Insira a kilometragem para iniciar o turno" isClearable isInvalid={!!errors.startedKm} color={getInputColor(errors.startedKm)} errorMessage={getInputErrorMessage(errors.startedKm)} />
                  <ModalFormFooter isLoading={isHandlingMutation} buttonLabel="Iniciar" handleClose={onClose} />
              </ModalBody>
            </form>
        </ModalContent>
      </Modal>
  )
})