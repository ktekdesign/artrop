import cep, { CEP } from 'cep-promise';
import { ChangeEvent, useState } from 'react';

const useCep = () => {
  const [addr, setAddr] = useState<CEP>();
  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const code = e.currentTarget.value?.replace(/\D/g, '');
    if (code?.length !== 8) return;
    cep(code, { providers: ['brasilapi'] }).then(setAddr);
  };
  return { cep: addr, handleCepChange };
};

export default useCep;
