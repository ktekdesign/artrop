"use client"

import StartTurn from "./start-turn"
import EndTurn from "./end-turn"

import useOperation from "../hooks/useOperation"
import Operation from "./operation"

export default function TurnButton () {
  const {operation} = useOperation()

  return (
    <div className="fixed w-full bottom-10 flex gap-x-8 justify-center items-center">
      {!operation?.turnId ? 
        <StartTurn />
      : 
        <>
          <Operation />
          {!operation?.id && <EndTurn />}
        </>
      }
    </div>
  )
}