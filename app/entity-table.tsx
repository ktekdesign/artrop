import { PairKeyLabel, pk } from '../interfaces';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react';
import ActionsButton from './actions-button';
import LoadingData from './loading-data';

export default function EntityTable<T extends pk, K extends keyof T>({ columns, rows }: { columns?: PairKeyLabel[], rows?: Pick<T, "id" | "actions" | K>[] }) {
  return (
    <LoadingData data={rows}>
      <Table aria-label='Lista das entidades' className='mt-8'>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.id}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{columnKey !== "actions" ? ["landingAt", "departAt"].includes(columnKey.toString()) ? new Intl.DateTimeFormat('pt-BR').format(new Date(getKeyValue(item, columnKey))) : getKeyValue(item, columnKey) : <ActionsButton id={item.id} />}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </LoadingData>
  )
}