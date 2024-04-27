"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { API_OPERATION_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";
import { Operation } from "@prisma/client";
import { minutesDiff } from "../utils/transform";
import { getVars } from "../utils/getVars";
import useSaveMutation from "../hooks/useSaveMutation";

interface OperationClose extends Pick<Operation, 'id' | 'status' | 'turnId' | 'endedAt' | 'duration'> {}

export default function EndOperation () {
  
  const {id: turnId, operation} = useOperation()
  const {operationId, operationStartedAt} = getVars(operation)
  const url = API_OPERATION_URL
  
  const {isHandlingMutation, onSubmit} = useSaveMutation({url})

  if (!operationId) return

  const close = async () => {
    const endedAt = new Date()
    const data: OperationClose = {
      status: true,
      turnId,
      id: operationId,
      endedAt,
      duration: minutesDiff(endedAt, operationStartedAt)
    }
    onSubmit(data)
}

  return (
    <Button size="lg" color="danger" isLoading={isHandlingMutation} className="text-white p-2" endContent={<LockClosedIcon />} onClick={close}>
      Encerrar Operação
    </Button>
  )
}