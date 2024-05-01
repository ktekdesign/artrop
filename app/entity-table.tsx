import { PairKeyLabel, pk } from '../interfaces';
import pickObjectKeys from '../utils/pickKeys';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@nextui-org/react';
import ActionsButton from './actions-button';
import LoadingComponent from './loading-component';

const EntityTable = <T extends pk, K extends keyof T>({ entities, titles, fields }: { entities?: T[], titles: string[], fields: K[] }) => {
  const columns: PairKeyLabel[]= titles.map((title, key) => ({id: fields[key].toString(), label: title}))
  columns.push({id: "actions", label: "Ações"})
  const rows = entities?.map(entity => pickObjectKeys(entity, fields)).map(row => ({...row, actions: ""}))
  
  return (
    <LoadingComponent isLoading={!rows}>
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
    </LoadingComponent>
)
  }

export default EntityTable
