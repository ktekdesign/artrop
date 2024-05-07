'use client';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { API_TURN_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../entity-modal';
import { Turn } from '@prisma/client';
import TurnTabs from '../../forms/turn-tabs';
import { useMemo } from 'react';

export default function IndexPage() {
  const [url, titles, fields] = useMemo(() => ([
    API_TURN_URL,
    ['Hora Inicio', 'Hora Fim', 'Km Inicio', 'Km Fim'],
    ['startedAt', 'startedKm', 'endedAt', 'endedKm']
  ]), [])
  
  const {entities, setEntities, columns, rows} = useEntities<Turn>(url, titles, fields as (keyof Turn)[])

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className='title'>Turnos</h1>
      <p className='paragraph'>A lista dos turnos.</p>
      <Search<Turn> entities={entities} setEntities={setEntities} />
      <EntityTable columns={columns} rows={rows} />
      <EntityModal url={url} label='turno'>
        <TurnTabs />
      </EntityModal>
    </main>
  );
}
