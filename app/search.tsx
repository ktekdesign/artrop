'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Input } from '@nextui-org/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const Search = <T, K extends keyof T>({ entities, setEntities }: { entities?: T[], setEntities?: Dispatch<SetStateAction<T[]>> }) => {
  const [search, setSearch] = useState("")
  
  function handleSearch(e) {
    setSearch(e.target.value)
  }

  //useEffect(() => setEntities(entities?.filter(entity => typeof entity === "object" ? Object.values(entity).some(value => value.includes(search)) : false) || []), [search])
  return (
    <div className="my-8 rounded-2xl flex justify-center items-center shadow-lg">
      <Input
        label="Search"
        isClearable
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
        placeholder="Type to search..."
        startContent={
          <MagnifyingGlassIcon className='w-4' />
        }
      />
    </div>
  );
}

export default Search