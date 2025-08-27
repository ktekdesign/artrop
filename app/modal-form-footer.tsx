import { Button, ModalFooter } from "@heroui/react";
import { memo } from "react";

export default memo(function ModalFormFooter ({isLoading, buttonLabel, handleClose}: {isLoading: boolean, buttonLabel?: string, handleClose(): void}) {
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