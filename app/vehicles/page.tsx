'use client';
import { Title, Text } from '@tremor/react';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { Vehicle } from "@prisma/client";
import { API_VEHICLE_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../entity-modal';
import VehicleTabs from '../../forms/vehicle-tabs';
import AddButton from '../add-button';

export default function IndexPage() {
  const url = API_VEHICLE_URL
  const {entities: vehicles} = useEntities<Vehicle>(url)
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <Title>Caminhões</Title>
          <Text>A lista dos caminhões.</Text>
        </div>
        <AddButton />
      </div>
      <Search />
      <EntityTable entities={vehicles} titles={['Placa', 'Capacidade', 'Caminhão', 'Carroceria']} fields={['licence_plate_1', 'capacity', 'truck', 'bodytruck']} />
      <EntityModal url={url} label='caminhão'>
        <VehicleTabs />
      </EntityModal>
    </main>
  );
}
