'use client';
import { Title, Text } from '@tremor/react';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { Ship } from "@prisma/client";
import { API_SHIP_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../../forms/entity-modal';
import ShipTabs from '../../forms/ship-tabs';
import AddButton from '../add-button';

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const url = API_SHIP_URL
  const ships = useEntities<Ship[]>(url)
  const titles = ['Nome', 'Produto', 'Data atracação', 'Data Desatracação']
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Navios</Title>
      <Text>A lista dos navios.</Text>
      <Search />
      <AddButton />
      <EntityTable entities={ships} titles={titles} fields={['name', 'product', 'landingAt', 'departAt']} />
      <EntityModal url={url} label='navio'>
        <ShipTabs />
      </EntityModal>
    </main>
  );
}
