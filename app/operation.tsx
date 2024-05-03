"use client"
import StartOperation from "./start-operation";
import EndOperation from "./end-operation";
import { OperationData } from "../interfaces";
import { memo } from "react";
import Travel from "./travel";

export default memo(function Operation ({operation, turnId}: {operation?: OperationData, turnId: string}) {
  
  if(!operation) return
  const {operationId, operationStartedAt, id} = operation
  
  return (
    <div className="fixed w-full bottom-10 flex flex-col gap-4 sm:flex-row sm:gap-8 justify-center items-center z-10 left-0">
      {!operationId ?
        <StartOperation turnId={turnId} />
        :
        <>
          <Travel operation={operation} />
          {!id && <EndOperation id={operationId} startedAt={operationStartedAt} />}
        </>
      }
    </div>
  )
})