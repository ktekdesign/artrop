import { deleteRecord, upsertRecord } from './api';
import { Action, pk } from '../interfaces';

export default async function submit<T extends pk>({
  data,
  action,
  url
}: {
  data: T;
  action: Action;
  url?: string;
}) {
  if (!url) throw new Error('A URL não foi encontrada');
  const { id, operation } = action;
  if (['update', 'delete'].includes(operation || '') && !data.id && !id)
    throw new Error(
      'O seu usuário não tem a permissão para realizar essa operação'
    );
  const endpoint = [url, id || ''];
  const entity = await (operation === 'delete'
    ? deleteRecord({ endpoint })
    : upsertRecord({ endpoint, data }));
  return entity;
}
