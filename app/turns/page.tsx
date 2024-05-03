'use client';
import Search from '../search';
import useEntities from '../../hooks/useEntities';
import { API_TURN_URL } from '../../utils/constants';
import EntityTable from '../entity-table';
import EntityModal from '../entity-modal';
import { Turn } from '@prisma/client';
import TurnTabs from '../../forms/turn-tabs';

export default function IndexPage() {
  const url = API_TURN_URL
  const {entities, isPending, init, setEntities} = useEntities<Turn>(url)

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <h1 className='title'>Turnos</h1>
      <p className='paragraph'>A lista dos turnos.</p>
      <Search<Turn> entities={init} setEntities={setEntities} />
      <EntityTable entities={entities} isPending={isPending} titles={['Hora Inicio', 'Hora Fim', 'Km Inicio', 'Km Fim']} fields={['startedAt', 'startedKm', 'endedAt', 'endedKm']} />
      <EntityModal url={url} label='turno'>
        <TurnTabs />
      </EntityModal>
    </main>
  );
}
