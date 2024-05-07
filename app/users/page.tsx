'use client'
import Search from '../search';
import { API_USER_URL } from '../../utils/constants';
import useEntities from '../../hooks/useEntities';
import EntityTable from '../entity-table';
import UserTabs from '../../forms/user-tabs';
import EntityModal from '../entity-modal';
import AddButton from '../add-button';
import { User } from '@prisma/client';
import { useMemo } from 'react';

export default function IndexPage() {
  const [url, titles, fields] = useMemo(() => ([
    API_USER_URL,
    ['Nome', 'Email', 'CPF', "Função"],
    ['name', 'email', 'govID', 'type']
  ]), [])
  
  const {entities, setEntities, columns, rows} = useEntities<User>(url, titles, fields as (keyof User)[])

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='title'>Usuários</h1>
          <p className='paragraph'>A lista dos usuários.</p>
        </div>
        <AddButton />
      </div>
      <Search<User> entities={entities} setEntities={setEntities} />
      <EntityTable columns={columns} rows={rows} />
      <EntityModal url={url} label='usuário'>
        <UserTabs />
      </EntityModal>
    </main>
  );
}
