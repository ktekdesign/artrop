import { PairKeyLabel } from '../interfaces';

const getTable = ({ titles, fields }) => {
  const columns: PairKeyLabel[] = titles.map((title, key) => ({
    id: fields[key].toString(),
    label: title
  }));
  columns.push({ id: 'actions', label: 'Ações' });
  const rows = entities
    ?.map((entity) => pickObjectKeys(entity, fields))
    .map((row) => ({ ...row, actions: '' }));
};
