"use client"
import { Button } from "@nextui-org/react";
import { Status, Operation, OperationType } from "@prisma/client";
import useOperation from "../hooks/useOperation";
import { insertRecord, updateRecord } from "../utils/api";
import { API_TRAVEL_URL, API_TURN_URL } from "../utils/constants";
import StartOperation from "./start-operation";
import useToast from "../hooks/useToast";
import { minutesDiff } from "../utils/transform";
import WeightButton from "./weight-button";
import EndOperation from "./end-operation";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

export default function Operation () {
  
  const queryClient = useQueryClient();
  const {operation} = useOperation() || {}
  
  const {handleToast} = useToast()
  const statuses: {status: Status, label: string, field?: string}[] = [
    {status: Status.INICIO_VIAGEM, label: "Iniciar Viagem", field: "startedAt"},
    {status: Status.INICIO_CARREGAMENTO, label: "Iniciar Carregamento", field: "start_load"},
    {status: Status.FIM_CARREGAMENTO, label: "Encerrar Carregamento", field: "end_load"},
    {status: Status.CHEGADA_BALANCA_CARREGADO, label: "Informar Chegada Balança", field: "start_balance_loaded"},
    {status: Status.SAIDA_BALANCA_CARREGADO, label: "Informar Saída Balança", field: "end_balance_loaded"},
    {status: Status.INICIO_DESCARREGAMENTO, label: "Iniciar Descarregamento", field: "start_unload"},
    {status: Status.FIM_DESCARREGAMENTO, label: "Encerrar Descarregamento", field: "end_unload"},
    {status: Status.CHEGADA_BALANCA_VAZIO, label: "Informar Retorno Balança", field: "start_balance_unloaded"},
    {status: Status.SAIDA_BALANCA_VAZIO, label: "Informar Saída Balança", field: "end_balance_unloaded"},
    {status: Status.INICIO_TRAVA_CONTAINER, label: "Iniciar Trava Container", field: "start_block_container"},
    {status: Status.FIM_TRAVA_CONTAINER, label: "Encerrar Trava Container", field: "end_block_container"},
    {status: Status.FIM_VIAGEM, label: "Encerrar viagem", field: "endAt"},
  ]
  const statusesFiltered = operation?.type !== OperationType.VIRINHA_CONTAINER ? statuses.filter(data => data.status !== Status.INICIO_TRAVA_CONTAINER && data.status !== Status.FIM_TRAVA_CONTAINER) : statuses
  const currentStatus = statusesFiltered.findIndex(index => index.status === operation?.travel?.status)
  const [nextStatus, setNextStatus] = useState(currentStatus + 1)
  
  const url = API_TRAVEL_URL
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      return operation?.travel?.id ? 
      (await updateRecord({url, data}))?.data
      :
      (await insertRecord({url, data}))?.data
    },
    onSuccess: (data: Operation) => {
      queryClient.invalidateQueries({
        queryKey: [API_TURN_URL, 'open']
      });
      setNextStatus((prev) => statusesFiltered.length - 1 <= prev ? 0 : prev + 1)
      if(data.duration) handleToast(`Viagem encerrada em ${data.duration} minutos`)
    }
    
    });

  if(!operation) return

  const updateStatus = async () => {
    const statusToUpdate = statusesFiltered[nextStatus].status
    if(statusToUpdate === Status.FIM_VIAGEM && !operation?.travel?.weight) return handleToast("É preciso informar o peso antes de encerrar a viagem");
    const statusTime = new Date()
    const data = operation.travel ? {
      id: operation.travel.id,
      status: statusesFiltered[nextStatus].status,
      operationId: operation.id,
      duration: statusToUpdate === Status.FIM_VIAGEM ? minutesDiff(statusTime, operation.startedAt) : 0,
      ...JSON.parse(`{"${statusesFiltered[nextStatus].field}": "${statusTime.toISOString()}"}`)
    } : {
      status: Status.INICIO_VIAGEM,
      operationId: operation.id
    }
    
    saveMutation.mutate(data)

  }

  if(nextStatus >= statusesFiltered.length) return
  return (
    <div className="text-center">
      {!operation.id ?
        <StartOperation />
        :
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <Button size="lg" color={nextStatus % 2 ? "success" : "warning"} isLoading={saveMutation.isLoading} onClick={() => updateStatus()} endContent={<ArrowRightIcon />}>
            {statusesFiltered[nextStatus].label}
          </Button>
          <WeightButton condition={!operation.travel?.weight && nextStatus >= 3} />
          <EndOperation />
        </div>
      }
    </div>
  )
}