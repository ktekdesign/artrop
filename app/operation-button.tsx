"use client"

import useOperation from "../hooks/useOperation"
import Operation from "./operation"

export default function OperationButton () {
  const operation = useOperation()

  return (operation?.id &&
    <div className="fixed w-full bottom-10 flex gap-x-8 justify-center items-center">
      <Operation />
    </div>
  )
}