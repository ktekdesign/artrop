'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Input } from '@nextui-org/react';
import { useCallback, useRef, useTransition } from 'react';
import { pk } from '../interfaces';

const Search = <T extends pk,>({ entities, setEntities }: { entities?: T[], setEntities: (data: T[] | undefined) => void }) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = useCallback(() => {
    const search = ref?.current?.value?.toLowerCase()
    const results = entities?.filter(entity => Object.values(entity).some(value => value?.toString().toLowerCase().includes(search)))
    startTransition(() => {
      setEntities(results || entities)
    })
  }, [entities, setEntities])

  return (
    <div className="my-8 rounded-2xl flex justify-center items-center shadow-lg">
      <Input
        label="Busca"
        isClearable
        ref={ref}
        radius="lg"
        onChange={handleSearch}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Digite aqui para fazer uma busca..."
        startContent={
          <MagnifyingGlassIcon className='w-4' />
        }
      />
    </div>
  );
}

export default Search