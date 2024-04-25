import { Children, ReactNode, cloneElement, isValidElement } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import { renderButtonLabel } from "../utils/constants";
import useModal from '../hooks/useModal';

export default function EntityModal ({label, url, children}: {label?: string, url: string, children: ReactNode}) {
  const {action: {operation}, isOpen, onOpenChange, handleClose} = useModal()
  const buttonLabel = renderButtonLabel(operation)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{buttonLabel} um {label}</ModalHeader>
            <ModalBody>
              
                {Children.map(children, (child) => {
                  if (isValidElement(child)) return cloneElement(child, { ...{buttonLabel, url } })
                  return <>{child}</>
                })}
              
            </ModalBody>
          </>
        )}
    </ModalContent>
  </Modal>
  )
}