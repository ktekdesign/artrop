"use client"
import { Button, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Vehicle, VehiclesTurn } from "@prisma/client";
import { API_VEHICLESTURN_URL, API_VEHICLE_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import useOperation from "../hooks/useOperation";
import useSaveMutation from "../hooks/useSaveMutation";

const schema = yup
  .object({
    vehicleId: yup.string().required()
  })
  .required()

interface VehiclesTurnInit extends Omit<VehiclesTurn, "id" | "turnId" | "createdAt" | "updatedAt" | "userId"> {
  userId?: string;
  turnId?: string;
}
export default function ChangeVehicleForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void}) {
  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const url = API_VEHICLESTURN_URL
  const {isHandlingMutation, onSubmit} = useSaveMutation<VehiclesTurn, VehiclesTurnInit>({url, onClose})
  const {entities: vehicles} = useEntities<Vehicle>(API_VEHICLE_URL)
  const {id} = useOperation()

  const handleData = async (data: VehiclesTurnInit) => onSubmit({...data, turnId: id})
  
  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleData)}>
              <ModalHeader className="flex flex-col gap-1">Trocar Caminhão</ModalHeader>
              <ModalBody>
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
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Fechar
                    </Button>
                    <Button type="submit" color="primary" isLoading={isHandlingMutation}>
                      Trocar
                    </Button>
                  </ModalFooter>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
  )
}