"use client"
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from "@nextui-org/react";
import { Icon } from "@tremor/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import { Operation, OperationType, Ship } from "@prisma/client";
import { useState } from "react";
import useToast from "../hooks/useToast";
import { API_OPERATION_URL, API_SHIP_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import useOperation from "../hooks/useOperation";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    shipId: yup.string().required(),
    type: yup.string<OperationType>().required()
  })
  .required()

interface OperationInit extends Pick<Operation, "shipId" | "type"> {}
export default function StartOperation () {
  const {
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
  const {handleToast} = useToast()
  const {setOperation} = useOperation()
  const router = useRouter()
  const url = API_OPERATION_URL
  const action = {operation: "insert"}
  const ships = useEntities<Ship[]>(API_SHIP_URL)
  const operations = [{key: 'VIRINHA_CACAMBA', value: 'Caçamba'}, {key: 'VIRINHA_PRANCHA', value: 'Prancha'}, {key: 'VIRINHA_CONTAINER', value: 'Container'}, {key: 'ENTRE_ARMAZENS', value: 'Entre Armazéns'}];
  
  const handleClose = () => {
    onClose();
    router.refresh()
  }

  const onSubmit = async (data: OperationInit) => setOperation(await submit(setIsLoading, handleToast, handleClose, {url, data, action}))
  
  return (
    <>
      <div className="text-center">
        <Button color="success" onPress={onOpen}>
          Iniciar Operação <Icon icon={RocketLaunchIcon} />
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Iniciar operação</ModalHeader>
              <ModalBody>
                <Controller
                  name="shipId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={ships}
                      label="Navio"
                    >
                      {({id, name}) => <SelectItem key={id}>{name}</SelectItem>}
                    </Select>
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={operations}
                      label="Tipo de operação"
                    >
                      {({key, value}) => <SelectItem key={key}>{value}</SelectItem>}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="primary" isLoading={isLoading}>
                  Iniciar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}