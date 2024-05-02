"use client"

import StartTurn from "./start-turn"
import EndTurn from "./end-turn"

import VehicleButton from "./vehicle-button"
import { memo } from "react"

export default memo(function TurnButton ({id, operationId}: {id: string, operationId?: string}) {
  return (
    !id ? <StartTurn /> : <div className="flex gap-4"><VehicleButton id={id} />{!operationId && <EndTurn id={id} />}</div>
  )
})