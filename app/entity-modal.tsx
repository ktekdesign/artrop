import { Children, ReactNode, cloneElement, isValidElement } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody} from "@nextui-org/react";
import { renderButtonLabel } from "../utils/constants";
import useModal from '../hooks/useModal';

export default function EntityModal ({label, title, url, children}: {label?: string, title?: string, url: string, children: ReactNode}) {
  const {action: {operation}, isOpen, onOpenChange, handleClose} = useModal()
  const buttonLabel = renderButtonLabel(operation)

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
      <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{title || `${buttonLabel} um ${label}`}</ModalHeader>
          <ModalBody>
            {Children.map(children, (child) => <>{isValidElement(child) ? cloneElement(child, { ...{buttonLabel, url } }) : child}</>)}
          </ModalBody>
    </ModalContent>
  </Modal>
  )
}