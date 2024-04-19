"use client"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Status, Operation } from "@prisma/client";
import useOperation from "../hooks/useOperation";
import { updateRecord } from "../utils/api";
import { API_OPERATION_URL } from "../utils/constants";
import StartOperation from "./start-operation";
import useToast from "../hooks/useToast";
import { minutesDiff } from "../utils/transform";
import WeightButton from "./weight-button";

export default function Operation () {
  const {operation: {turnId, id, status, type}, setOperation} = useOperation()
  const {handleToast} = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [weight, setWeight] = useState(0)
  const statuses: {status: Status, label: string, field?: string}[] = [
    {status: "INICIO_CARREGAMENTO", label: "Iniciar Carregamento", field: "start_load"},
    {status: "FIM_CARREGAMENTO", label: "Encerrar Carregamento", field: "end_load"},
    {status: "CHEGADA_BALANCA_CARREGADO", label: "Informar Chegada Balança", field: "start_balance_loaded"},
    {status: "SAIDA_BALANCA_CARREGADO", label: "Informar Saída Balança", field: "end_balance_loaded"},
    {status: "INICIO_DESCARREGAMENTO", label: "Iniciar Descarregamento", field: "start_unload"},
    {status: "FIM_DESCARREGAMENTO", label: "Encerrar Descarregamento", field: "end_unload"},
    {status: "CHEGADA_BALANCA_VAZIO", label: "Informar Retorno Balança", field: "start_balance_unloaded"},
    {status: "SAIDA_BALANCA_VAZIO", label: "Informar Saída Balança", field: "end_balance_unloaded"},
    {status: "INICIO_TRAVA_CONTAINER", label: "Iniciar Trava Container", field: "start_block_container"},
    {status: "FIM_TRAVA_CONTAINER", label: "Encerrar Trava Container", field: "end_block_container"},
    {status: "FIM_VIAGEM", label: "Encerrar operação", field: "endAt"},
  ]
  const statusesFiltered = type !== "VIRINHA_CONTAINER" ? statuses.filter(status => !["INICIO_TRAVA_CONTAINER", "FIM_TRAVA_CONTAINER"].includes(status.status)) : statuses
  const currentStatus = statusesFiltered.findIndex(index => index.status === status)
  const nextStatus = currentStatus + 1
  const updateStatus = async () => {
    setIsLoading(true)
    const operation = (await updateRecord<Operation>({url: API_OPERATION_URL, data: {
      id,
      status: statusesFiltered[nextStatus].status,
      ...JSON.parse(`{"${statusesFiltered[nextStatus].field}": "${(new Date()).toISOString()}"}`)
    }}))?.data
    
    if(nextStatus >= statusesFiltered.length - 1) {
      setOperation({turnId})
      setWeight(0)
      handleToast(`Opereção encerrada em ${minutesDiff(new Date(operation.endAt), new Date(operation.startedAt))} minutos`)
    } else {
      setWeight(operation.weight)
      setOperation({turnId, id: operation.id, status: operation.status, type: operation.type})
    }
    
  setIsLoading(false)
  }
  if(nextStatus >= statusesFiltered.length) return <></>
  return (
    <>
      <div className="text-center">
        {!id ?
          <StartOperation />
          :
          <div className="flex gap-x-8">
            <Button color="warning" isLoading={isLoading} onClick={() => updateStatus()}>
              {statusesFiltered[nextStatus].label}
            </Button>
            <WeightButton condition={!weight && nextStatus >= 3} setWeight={setWeight} />
          </div>
        }
        
      </div>
    </>
  )
}