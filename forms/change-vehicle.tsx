"use client"
import { Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Vehicle, VehiclesTurn } from "@prisma/client";
import { API_VEHICLESTURN_URL, API_VEHICLE_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo } from "react";
import ModalFormFooter from "../app/modal-form-footer";

const schema = yup
  .object({
    vehicleId: yup.string().required()
  })
  .required()

interface VehiclesTurnInit extends Pick<VehiclesTurn, "vehicleId"> {
  userId?: string;
  turnId?: string;
}
export default memo(function ChangeVehicleForm ({isOpen, onOpenChange, onClose, turnId}: {isOpen: boolean, onOpenChange(): void, onClose(): void, turnId: string}) {
  const {
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isHandlingMutation, onSubmit} = useSaveMutation<VehiclesTurn, VehiclesTurnInit>(API_VEHICLESTURN_URL, onClose)
  const {entities: vehicles} = useEntities<Vehicle>(API_VEHICLE_URL)

  const handleData = (data: VehiclesTurnInit) => onSubmit({...data, turnId})
  
  return (
    <Modal placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
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
                    label="Veículo"
                    placeholder="Escolha o Veículo"
                  >
                    {(vehicle: Vehicle) => <SelectItem key={vehicle.id}>{vehicle.licence_plate_1}</SelectItem>}
                  </Select>
                )}
              />
              <ModalFormFooter isLoading={isHandlingMutation} buttonLabel="Trocar" handleClose={onClose} />
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  )
})