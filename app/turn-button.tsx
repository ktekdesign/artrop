"use client"

import StartTurn from "./start-turn"
import EndTurn from "./end-turn"

import useOperation from "../hooks/useOperation"
import VehicleButton from "./vehicle-button"

export default function TurnButton () {
  const turn = useOperation()
  
  if(turn === undefined) return
  return (
    !turn?.id ? <StartTurn /> : <div className="flex gap-4"><VehicleButton />{!turn.operation?.id && <EndTurn id={turn.id} />}</div>
  )
}