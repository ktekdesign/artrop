'use client'
import Search from '../search';
import { API_USER_URL } from '../../utils/constants';
import useEntities from '../../hooks/useEntities';
import EntityTable from '../entity-table';
import UserTabs from '../../forms/user-tabs';
import EntityModal from '../entity-modal';
import AddButton from '../add-button';
import { User } from '@prisma/client';

export default function IndexPage() {
  
  const url = API_USER_URL
  const {entities, isPending, init, setEntities} = useEntities<User>(url)

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='title'>Usuários</h1>
          <p className='paragraph'>A lista dos usuários.</p>
        </div>
        <AddButton />
      </div>
      <Search<User> entities={init} setEntities={setEntities} />
      <EntityTable entities={entities} titles={['Nome', 'Email', 'CPF', "Função"]} fields={['name', 'email', 'govID', 'type']} isPending={isPending} />
      <EntityModal url={url} label='usuário'>
        <UserTabs />
      </EntityModal>
    </main>
  );
}
