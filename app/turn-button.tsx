"use client"

import StartTurn from "./start-turn"
import EndTurn from "./end-turn"

import useOperation from "../hooks/useOperation"
import VehicleButton from "./vehicle-button"

export default function TurnButton () {
  const operation = useOperation()
  
  if(operation === undefined) return
  return (
    !operation?.turnId ? <StartTurn /> : <div className="flex gap-4"><VehicleButton />{!operation?.id && <EndTurn id={operation.turnId} />}</div>
  )
}