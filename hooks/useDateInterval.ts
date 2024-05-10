import { getLocalTimeZone, today } from '@internationalized/date';
import { DateValue, RangeValue, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

const useDateInterval = () => {
  const [interval, setInterval] = useState<string | number>(1);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [custom, setCustom] = useState<RangeValue<DateValue>>({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).subtract({ weeks: 2 })
  });

  const handleInterval = (interval: string) => {
    if (interval === 'custom') {
      onOpen();
    }
    setInterval(interval);
  };

  const handleCustom = (custom: RangeValue<DateValue>) => {
    setCustom(custom);
  };
  return {
    interval,
    handleInterval,
    isOpen,
    onClose,
    onOpenChange,
    custom,
    handleCustom
  };
};

export default useDateInterval;
