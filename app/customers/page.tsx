'use client';
import { Title, Text } from '@tremor/react';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { API_CUSTOMER_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import CustomerTabs from '../../forms/customer-tabs';
import EntityModal from '../entity-modal';
import AddButton from '../add-button';
import { Customer } from '@prisma/client';

export default function IndexPage() {
  const url = API_CUSTOMER_URL
  const {entities: customers} = useEntities<Customer>(url)
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <Title>Clientes</Title>
          <Text>A lista dos clientes.</Text>
        </div>
        <AddButton />
      </div>
      <Search />
      <EntityTable entities={customers} titles={['Nome', 'Email', 'CNPJ']} fields={['name', 'email', 'govID']} />
      <EntityModal url={url} label='cliente'>
        <CustomerTabs />
      </EntityModal>
    </main>
  );
}
