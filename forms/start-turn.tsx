"use client"
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Customer, Turn, Vehicle } from "@prisma/client";
import { API_CUSTOMER_URL, API_TURN_URL, API_VEHICLE_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import { getInputColor, getInputErrorMessage } from "../utils/input-errors";
import useEntity from "../hooks/useEntity";

const schema = yup
  .object({
    startedKm: yup.number().required(),
    vehicleId: yup.string().required(),
    customerId: yup.string().required()
  })
  .required()

interface TurnInit extends Omit<Turn, "id" | "userId" | "startedAt" | "endedAt" | "endedKm" | "status" | "duration"> {
  userId?: string
}
export default function StartTurnForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const url = API_TURN_URL
  const {saveMutation} = useEntity<Turn, TurnInit>({url})
  const {entities: customers} = useEntities<Customer>(API_CUSTOMER_URL)
  const {entities: vehicles} = useEntities<Vehicle>(API_VEHICLE_URL)

  const onSubmit = async (data: TurnInit) => saveMutation.mutate(data)
  
  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
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
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Fechar
                    </Button>
                    <Button type="submit" color="primary" isLoading={saveMutation.isLoading}>
                      Iniciar
                    </Button>
                  </ModalFooter>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
  )
}