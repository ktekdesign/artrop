'use client';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { Ship } from "@prisma/client";
import { API_SHIP_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../entity-modal';
import ShipTabs from '../../forms/ship-tabs';
import AddButton from '../add-button';
import { useMemo } from 'react';

export default function IndexPage() {
  const [url, titles, fields] = useMemo(() => ([
    API_SHIP_URL,
    ['Nome', 'Produto', 'Data atracação', 'Data Desatracação'],
    ['name', 'product', 'landingAt', 'departAt']
  ]), [])
  const {entities, setEntities, columns, rows} = useEntities<Ship>(url, titles, fields as (keyof Ship)[])
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='title'>Navios</h1>
          <p className='paragraph'>A lista dos navios.</p>
        </div>
        <AddButton />
      </div>
      <Search<Ship> entities={entities} setEntities={setEntities} />
      <EntityTable columns={columns} rows={rows} />
      <EntityModal url={url} label='um navio'>
        <ShipTabs />
      </EntityModal>
    </main>
  );
}
