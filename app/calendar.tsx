import {Button, DateValue, Modal, ModalBody, ModalContent, ModalFooter, RangeCalendar, RangeValue} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";
import { memo } from "react";

export default memo(function Calendar({isOpen, onOpenChange, onClose, custom, handleCustom}: {isOpen: boolean, onOpenChange(): void, onClose(): void, custom: RangeValue<DateValue>, handleCustom: (custom: RangeValue<DateValue>) => void}) {
  return (
    <Modal size="2xl" placement='center' isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalBody className="pt-12">
          <RangeCalendar 
            aria-label="Date (Visible Month)" 
            visibleMonths={2}
            maxValue={today(getLocalTimeZone())}
            value={custom} 
            onChange={handleCustom}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Fechar
          </Button>
          <Button type="submit" color="primary" onPress={onClose}>
            Selecionar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
})