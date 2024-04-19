import { Dispatch, SetStateAction } from 'react';
import { deleteRecord, insertRecord, updateRecord } from './api';
import { Action } from '../interfaces';

export default async function submit<T>(
  loading: Dispatch<SetStateAction<boolean>>,
  toast: (message?: string) => void,
  onClose: () => void,
  {
    data,
    action,
    url
  }: {
    data: T;
    action: Action;
    url?: string;
  }
) {
  if (!url) return;
  const { id, operation } = action;
  if (operation && ['update', 'delete'].includes(operation) && !id)
    return toast(
      'O seu usuário não tem a permissão para realizar essa operação'
    );
  loading(true);
  const entity =
    operation === 'update'
      ? await updateRecord({ url, data: { ...data, id } })
      : operation === 'delete'
        ? await deleteRecord({ url: `${url}${id}` })
        : await insertRecord({ url, data });
  toast(entity?.message);
  if (operation === 'insert' || operation === 'delete') onClose();
  loading(false);
  return entity?.data;
}
