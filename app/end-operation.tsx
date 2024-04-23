"use client"
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import { API_OPERATION_URL, API_TURN_URL } from "../utils/constants";
import useOperation from "../hooks/useOperation";
import { Operation } from "@prisma/client";
import { useEffect } from "react";
import { useMutation, useQueryClient } from 'react-query';
import { updateRecord } from "../utils/api";

interface OperationClose extends Pick<Operation, 'id' | 'status' | 'turnId'> {}

export default function EndOperation () {
  
  const {turnId, id, travel} = useOperation()
  const url = API_OPERATION_URL
  const queryClient = useQueryClient();
  
  const saveMutation = useMutation({
    mutationFn: async (data: OperationClose) => {
      const response = await updateRecord({url, data})
      if(response) {
      await queryClient.invalidateQueries({
        queryKey: [`${API_TURN_URL}open`]
      });
    }
      return response;
    }
  });

  useEffect(() => {
    if(saveMutation.isSuccess) queryClient.invalidateQueries([`${API_TURN_URL}open`]);
  })
  
  const close = async () => {
    if(turnId && id) {
      const data: OperationClose = {
        status: true,
        turnId,
        id
      }
      saveMutation.mutate(data)
    }
  }

  if (!id || !turnId || travel) return

  return (
    <Button size="lg" color="danger" isLoading={saveMutation.isLoading} className="text-white p-2" endContent={<LockClosedIcon />} onClick={close}>
      Encerrar Operação
    </Button>
  )
}