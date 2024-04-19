'use client';
import { Title, Text } from '@tremor/react';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { Vehicle } from "@prisma/client";
import { API_VEHICLE_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../../forms/entity-modal';
import VehicleTabs from '../../forms/vehicle-tabs';
import AddButton from '../add-button';

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const url = API_VEHICLE_URL
  const vehicles = useEntities<Vehicle[]>(url)
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Caminhões</Title>
      <Text>A lista dos caminhões.</Text>
      <Search />
      <AddButton />
      <EntityTable entities={vehicles} titles={['Placa', 'Capacidade']} fields={['licence_plate_1', 'capacity']} />
      <EntityModal url={url} label='caminhão'>
        <VehicleTabs />
      </EntityModal>
    </main>
  );
}
