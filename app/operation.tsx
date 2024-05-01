"use client"
import { Button } from "@nextui-org/react";
import { Status, Operation } from "@prisma/client";
import StartOperation from "./start-operation";
import WeightButton from "./weight-button";
import EndOperation from "./end-operation";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { OperationData } from "../interfaces";
import useTravel from "../hooks/useTravel";

export default function Operation ({operation}: {operation: OperationData}) {
  
  const {statusesFiltered, nextStatus, isHandlingMutation, updateStatus, operationId, handleWeight, operationStartedAt} = useTravel(operation)
  
  return (
    <div className="fixed w-full bottom-10 flex gap-x-8 justify-center items-center z-10 left-0">
      {!operationId ?
        <StartOperation />
        :
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          {statusesFiltered[nextStatus].status !== Status.PESO_CARREGADO && statusesFiltered[nextStatus].status !== Status.PESO_DESCARREGADO ? 
            <Button size="lg" color={nextStatus % 2 ? "success" : "warning"} isLoading={isHandlingMutation} onClick={() => updateStatus()} endContent={<ArrowRightIcon />}>
              {statusesFiltered[nextStatus].label}
            </Button>
          :
            <WeightButton field={statusesFiltered[nextStatus].field} isHandlingMutation={isHandlingMutation} handleWeight={handleWeight} />
          }
          <EndOperation id={operationId} startedAt={operationStartedAt} />
        </div>
      }
    </div>
  )
}