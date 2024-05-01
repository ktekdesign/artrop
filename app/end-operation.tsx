"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { API_OPERATION_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";
import { Operation } from "@prisma/client";
import { minutesDiff } from "../utils/transform";
import { getVars } from "../utils/getVars";
import useSaveMutation from "../hooks/useSaveMutation";

interface OperationClose extends Pick<Operation, 'id' | 'status' | 'endedAt' | 'duration'> {}

export default function EndOperation ({id, startedAt}: {id?: string, startedAt?: Date}) {
  
  const {isHandlingMutation, onSubmit} = useSaveMutation(API_OPERATION_URL)

  if (!id) return

  const close = () => {
    const endedAt = new Date()
    const data: OperationClose = {
      status: true,
      id,
      endedAt,
      duration: minutesDiff(endedAt, startedAt)
    }
    onSubmit(data)
}

  return (
    <Button size="lg" color="danger" isLoading={isHandlingMutation} className="text-white p-2" endContent={<LockClosedIcon />} onClick={close}>
      Encerrar Operação
    </Button>
  )
}