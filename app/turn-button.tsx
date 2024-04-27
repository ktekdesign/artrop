"use client"

import StartTurn from "./start-turn"
import EndTurn from "./end-turn"

import useOperation from "../hooks/useOperation"
import VehicleButton from "./vehicle-button"
import { getVars } from "../utils/getVars"

export default function TurnButton () {
  const {isSuccess, id, operation} = useOperation()
  const {operationId} = getVars(operation)

  if(!isSuccess) return
  return (
    !id ? <StartTurn /> : <div className="flex gap-4"><VehicleButton />{!operationId && <EndTurn />}</div>
  )
}