'use client';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { Ship } from "@prisma/client";
import { API_SHIP_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../entity-modal';
import ShipTabs from '../../forms/ship-tabs';
import AddButton from '../add-button';

export default function IndexPage() {
  const url = API_SHIP_URL
  const {entities, isPending, init, setEntities} = useEntities<Ship>(url)
  
  const titles = ['Nome', 'Produto', 'Data atracação', 'Data Desatracação']
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='title'>Navios</h1>
          <p className='paragraph'>A lista dos navios.</p>
        </div>
        <AddButton />
      </div>
      <Search<Ship> entities={init} setEntities={setEntities} />
      <EntityTable entities={entities} isPending={isPending} titles={titles} fields={['name', 'product', 'landingAt', 'departAt']} />
      <EntityModal url={url} label='navio'>
        <ShipTabs />
      </EntityModal>
    </main>
  );
}
