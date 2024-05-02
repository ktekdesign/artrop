"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { API_OPERATION_URL } from "../utils/constants";
import { Operation } from "@prisma/client";
import { minutesDiff } from "../utils/transform";
import useSaveMutation from "../hooks/useSaveMutation";
import { memo } from "react";

interface OperationClose extends Pick<Operation, 'id' | 'status' | 'endedAt' | 'duration'> {}

export default memo(function EndOperation ({id, startedAt}: {id?: string, startedAt?: Date}) {
  
  const {isHandlingMutation, onSubmit} = useSaveMutation<Operation, OperationClose>(API_OPERATION_URL)

  if (!id) return

  const close = () => {
    const endedAt = new Date()
    const duration = minutesDiff(endedAt, startedAt)
    onSubmit({
      status: true,
      id,
      endedAt,
      duration
    })
  }

  return (
    <Button size="lg" color="danger" isLoading={isHandlingMutation} className="text-white p-2" endContent={<LockClosedIcon />} onClick={close}>
      Encerrar Operação
    </Button>
  )
})