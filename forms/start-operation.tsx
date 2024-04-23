"use client"
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Operation, OperationType, Ship } from "@prisma/client";
import { useEffect } from "react";
import { API_OPERATION_URL, API_SHIP_URL, API_TURN_URL } from "../utils/constants";
import useEntities from "../hooks/useEntities";
import useOperation from "../hooks/useOperation";
import useEntity from "../hooks/useEntity";
import { useQueryClient } from 'react-query';

const schema = yup
  .object({
    shipId: yup.string().required(),
    type: yup.string<OperationType>().required(),
    turnId: yup.string()
  })
  .required()

interface OperationInit extends Pick<Operation, "shipId" | "type"> {
  turnId?: string;
}

export default function StartOperationForm ({isOpen, onOpenChange, onClose}: {isOpen: boolean, onOpenChange(): void, onClose(): void}) {
  const {
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const url = API_OPERATION_URL
  const queryClient = useQueryClient();
  const {saveMutation} = useEntity<Operation, OperationInit>({url})
  const {turnId} = useOperation()
  const {entities: ships} = useEntities<Ship>(API_SHIP_URL)
  const operations = [{key: 'VIRINHA_CACAMBA', value: 'Caçamba'}, {key: 'VIRINHA_PRANCHA', value: 'Prancha'}, {key: 'VIRINHA_CONTAINER', value: 'Container'}, {key: 'ENTRE_ARMAZENS', value: 'Entre Armazéns'}];
  
  useEffect(() => {
    if(saveMutation.isSuccess) {
      onClose()
      queryClient.invalidateQueries([`${API_TURN_URL}open`]);
    }
  })
  
  if(!turnId) return

  const onSubmit = async (data: OperationInit) => saveMutation.mutate({...data, turnId})
  
  return (
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
                      {({id, name}: {id: string, name: string}) => <SelectItem key={id}>{name}</SelectItem>}
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
                      {({key, value}: {key: string, value: string}) => <SelectItem key={key}>{value}</SelectItem>}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button type="submit" color="primary" isLoading={saveMutation.isLoading}>
                  Iniciar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
  )
}