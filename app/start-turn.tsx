"use client"
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Icon } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import { Customer, Turn, Vehicle } from "@prisma/client";
import { useState } from "react";
import useToast from "../hooks/useToast";
import { API_CUSTOMER_URL, API_TURN_URL, API_VEHICLE_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import { useRouter } from "next/navigation";
import useOperation from "../hooks/useOperation";

const schema = yup
  .object({
    startedKm: yup.number().required(),
    vehicleId: yup.string().required(),
    customerId: yup.string().required()
  })
  .required()

interface TurnInit extends Omit<Turn, "id" | "userId" | "startedAt" | "endedAt" | "endedKm" | "status"> {
  userId?: string
}
export default function StartTurn () {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const {handleToast} = useToast()
  const {setOperation} = useOperation()
  const url = API_TURN_URL
  const action = {operation: "insert"}
  const customers = useEntities<Customer[]>(API_CUSTOMER_URL)
  const vehicles = useEntities<Vehicle[]>(API_VEHICLE_URL)

  const onSubmit = async (data: TurnInit) => setOperation(await submit(setIsLoading, handleToast, onClose, {url, data, action}))
  
  return (
    <>
      <div className="text-center">
        <Button color="success" onPress={onOpen}>
          Iniciar Turno <Icon icon={RocketLaunchIcon} />
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Iniciar turno</ModalHeader>
              <ModalBody>
                  <Input type="number" {...register("startedKm")} label="Kilometragem do vehiculo" placeholder="Insira a kilometragem para iniciar o turno" />
                  <p>{errors.startedKm?.message}</p>
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
                        {(customers) => <SelectItem key={customers.id}>{customers.name}</SelectItem>}
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
                        {(vehicles) => <SelectItem key={vehicles.id}>{vehicles.licence_plate_1}</SelectItem>}
                      </Select>
                    )}
                  />
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Fechar
                    </Button>
                    <Button type="submit" color="primary" isLoading={isLoading}>
                      Iniciar
                    </Button>
                  </ModalFooter>
              </ModalBody>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}