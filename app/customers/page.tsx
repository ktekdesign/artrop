'use client';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { API_CUSTOMER_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import CustomerTabs from '../../forms/customer-tabs';
import EntityModal from '../entity-modal';
import AddButton from '../add-button';
import { Customer } from '@prisma/client';
import { useMemo } from 'react';

export default function IndexPage() {
  const [url, titles, fields] = useMemo(() => ([
    API_CUSTOMER_URL,
    ['Nome', 'Email', 'CNPJ'],
    ['name', 'email', 'govID']
  ]), [])
  const {entities, setEntities, columns, rows} = useEntities<Customer>(url, titles, fields as (keyof Customer)[])

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='title'>Clientes</h1>
          <p className='paragraph'>A lista dos clientes.</p>
        </div>
        <AddButton />
      </div>
      <Search<Customer> entities={entities} setEntities={setEntities} />
      <EntityTable columns={columns} rows={rows} />
      <EntityModal url={url} label='cliente'>
        <CustomerTabs />
      </EntityModal>
    </main>
  );
}
