"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { API_OPERATION_URL, API_TURN_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";
import { Operation } from "@prisma/client";
import { useMutation, useQueryClient } from 'react-query';
import { updateRecord } from "../utils/api";
import { minutesDiff } from "../utils/transform";

interface OperationClose extends Pick<Operation, 'id' | 'status' | 'turnId' | 'endedAt' | 'duration'> {}

export default function EndOperation () {
  
  const {id: turnId, operation} = useOperation() || {}
  const url = API_OPERATION_URL
  const queryClient = useQueryClient();
  
  const saveMutation = useMutation({
    mutationFn: async (data: OperationClose) => {
      return updateRecord({url, data})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [API_TURN_URL]
      });
    }
  });
  
  const close = async () => {
    if(turnId && operation) {
      const endedAt = new Date()
      const data: OperationClose = {
        status: true,
        turnId,
        id: operation.id,
        endedAt,
        duration: minutesDiff(endedAt, operation.startedAt)
      }
      saveMutation.mutate(data)
    }
  }

  if (operation && !operation.travel) return

  return (
    <Button size="lg" color="danger" isLoading={saveMutation.isLoading} className="text-white p-2" endContent={<LockClosedIcon />} onClick={close}>
      Encerrar Operação
    </Button>
  )
}