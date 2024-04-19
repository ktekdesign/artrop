'use client'
import { Title, Text } from '@tremor/react';
import Search from '../search';
import { API_USER_URL } from '../../utils/constants';
import useEntities from '../../hooks/useEntities';
import EntityTable from '../entity-table';
import UserTabs from '../../forms/user-tabs';
import EntityModal from '../../forms/entity-modal';
import AddButton from '../add-button';
import { User } from '@prisma/client';

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  
  const url = API_USER_URL
  const users = useEntities<User[]>(url)
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Motoristas</Title>
      <Text>A lista dos motoristas.</Text>
      <Search />
      <AddButton />
      <EntityTable entities={users} titles={['Nome', 'Email', 'CPF']} fields={['name', 'email', 'govID']} />
      <EntityModal url={url} label='usuário'>
        <UserTabs />
      </EntityModal>
    </main>
  );
}
