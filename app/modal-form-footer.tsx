import { Button, ModalFooter } from "@nextui-org/react";
import useModal from "../hooks/useModal";

export default function ModalFormFooter ({isLoading, buttonLabel}: {isLoading: boolean, buttonLabel?: string}) {
  const {handleClose} = useModal()
  return (
    <ModalFooter>
      <Button color="danger" variant="light" onPress={handleClose}>
        Fechar
      </Button>
      <Button type="submit" color="primary" isLoading={isLoading}>
        {buttonLabel}
      </Button>
    </ModalFooter>
  )
}