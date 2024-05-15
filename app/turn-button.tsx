"use client"

import StartTurn from "./start-turn"
import EndTurn from "./end-turn"

import VehicleButton from "./vehicle-button"
import { memo } from "react"

export default memo(function TurnButton ({id, operationId, isSuccess, startedKm}: {id: string, operationId?: string, isSuccess: boolean, startedKm: number}) {
  if (!isSuccess) return
  return (
    !id ? <StartTurn /> : <div className="flex items-center gap-1 md:gap-2"><VehicleButton id={id} />{!operationId && <EndTurn id={id} startedKm={startedKm} />}</div>
  )
})