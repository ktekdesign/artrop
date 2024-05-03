import { data } from 'autoprefixer';
import cep, { CEP } from 'cep-promise';
import { ChangeEvent, useCallback, useState } from 'react';

const useCep = (callback: (value: CEP) => void) => {
  const [addr, setAddr] = useState<CEP>();
  const handleCepChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const code = e.currentTarget.value?.replace(/\D/g, '');
      if (code?.length !== 8) return;
      cep(code, { providers: ['brasilapi'] })
        .then((data) => {
          const value = data as CEP;
          setAddr(value);
          return value;
        })
        .then((value) => {
          if (!value) return;
          callback(value);
        });
    },
    [callback]
  );
  return { cep: addr, handleCepChange };
};

export default useCep;
