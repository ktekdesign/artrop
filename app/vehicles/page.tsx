'use client';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { Vehicle } from "@prisma/client";
import { API_VEHICLE_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../entity-modal';
import VehicleTabs from '../../forms/vehicle-tabs';
import AddButton from '../add-button';
import { useMemo } from 'react';

export default function IndexPage() {
  const [url, titles, fields] = useMemo(() => ([
    API_VEHICLE_URL,
    ['Placa', 'Capacidade', 'Caminhão', 'Carroceria'],
    ['licence_plate_1', 'capacity', 'truck', 'bodytruck']
  ]), [])
  const {entities, setEntities, columns, rows} = useEntities<Vehicle>(url, titles, fields as (keyof Vehicle)[])
  
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='title'>Caminhões</h1>
          <p className='paragraph'>A lista dos caminhões.</p>
        </div>
        <AddButton />
      </div>
      <Search<Vehicle> entities={entities} setEntities={setEntities} />
      <EntityTable columns={columns} rows={rows} />
      <EntityModal url={url} label='um caminhão'>
        <VehicleTabs />
      </EntityModal>
    </main>
  );
}
