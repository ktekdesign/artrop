import { Button, ModalFooter } from "@nextui-org/react";
import useModal from "../hooks/useModal";
import { memo } from "react";

export default memo(function ModalFormFooter ({isLoading, buttonLabel}: {isLoading: boolean, buttonLabel?: string}) {
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
})