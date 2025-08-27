'use client';

import { memo } from 'react';
import DateRange from '../../date-range';
import useDateInterval from '../../../hooks/useDateInterval';
import LoadingData from '../../loading-data';
import { Card, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from '@heroui/react';
import useReports from '../../../hooks/useReports';
import Calendar from '../../calendar';
import { dateFormatter, timeFormatter } from '../../../utils/formatDate';

export default memo(function DashboardPage() {
  const {interval, handleInterval, isOpen, onClose, onOpenChange, custom, handleCustom} = useDateInterval();
  const {data, travelColumns} = useReports(interval, custom);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <DateRange handleInterval={handleInterval} />
      <Calendar isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} custom={custom} handleCustom={handleCustom} />
      <div className='gap-4'>
        <LoadingData data={data}>
          <ul>
            {data?.map(user => (
              <li key={user.id}>
                <Card className='p-4 my-4'>
                <h3><b>{user.name}</b> | {user.govID}</h3>
                <ul className='ml-2'>
                  {user.turn.map(turn =>
                    <li key={turn.id}>
                      <Card className='p-4 my-4'>
                    <h3>Turno: {dateFormatter.format(new Date(turn.startedAt))} - {turn.endedAt && dateFormatter.format(new Date(turn.endedAt))}</h3>
                    <ul className='ml-4'>
                      {turn.operation.map(operation =>
                        <li key={operation.id}>
                          <h4 className='text-sm'>Operação <b>{operation.type}</b>: {dateFormatter.format(new Date(operation.startedAt))} - {operation.endedAt && dateFormatter.format(new Date(operation.endedAt))}
                            <span className='mx-2'>|</span>Total de Toneladas Transportadas: <b>{operation.travel.reduce((acc, curr) => acc + (curr.weight_load && curr.weight_unload ? Math.abs(curr.weight_load - curr.weight_unload) : 0), 0)}</b>
                            <span className='mx-2'>|</span>Total de Viagens: <b>{operation.travel.length}</b>
                          </h4>
                          <Table key={operation.id} aria-label='Lista das viagens' className='ml-6 my-4'>
                            <TableHeader columns={travelColumns}>
                              {(column) => <TableColumn key={column.id}>{column.report}</TableColumn>}
                            </TableHeader>
                            <TableBody items={operation.travel}>
                              {(item) => (
                                <TableRow key={item.id}>
                                  {(columnKey) => <TableCell>{getKeyValue(item, columnKey)?.toString().includes("-") ? timeFormatter.format(new Date(getKeyValue(item, columnKey))) : getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </li>
                      )}
                    </ul>
                    </Card>
                    </li>
                  )}
                </ul>
                </Card>
              </li>
            ))}
          </ul>
        </LoadingData>
      </div>
    </main>
  );
})
