"use client"

import StartTurn from "./start-turn"
import EndTurn from "./end-turn"

import VehicleButton from "./vehicle-button"
import Operation from "./operation"
import { OperationData } from "../interfaces"

export default function TurnButton ({id, operation}: {id: string, operation: OperationData}) {
  return (
    !id ? <StartTurn /> : <><div className="flex gap-4"><VehicleButton id={id} />{!operation.operationId && <EndTurn id={id} />}</div><Operation operation={operation} /></>
  )
}