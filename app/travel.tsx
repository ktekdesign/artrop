"use client"
import { Button } from "@heroui/react";
import WeightButton from "./weight-button";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { OperationData } from "../interfaces";
import useTravel from "../hooks/useTravel";
import { memo } from "react";

export default memo(function Travel ({operation}: {operation: OperationData}) {
  
  const {toggleButton, toggleColor, nextStatus: {label, id}, isHandlingMutation, updateStatus, handleWeight} = useTravel(operation)
  return (
    <>
      { toggleButton ? 
        <Button size="lg" color={toggleColor ? 'success' : 'warning'} isLoading={isHandlingMutation} onClick={updateStatus} endContent={<ArrowRightIcon />}>
          {label}
        </Button>
      :
        <WeightButton field={id} isHandlingMutation={isHandlingMutation} handleWeight={handleWeight} />
      }
    </>
  )
})