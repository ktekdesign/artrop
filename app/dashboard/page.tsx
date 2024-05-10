'use client';

import Chart from '../pie-chart-dashboard';
import useDashboard from '../../hooks/useDashboard';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Loading from '../loading';
import useDashboardOperation from '../../hooks/useDashboardOperation';
import { memo } from 'react';
import DateRange from '../date-range';
import useDateInterval from '../../hooks/useDateInterval';
import Calendar from '../calendar';

export default memo(function DashboardPage() {
  const {interval, handleInterval, isOpen, onClose, onOpenChange, custom, handleCustom} = useDateInterval();
  const {turns, operations, travels, isLoading} = useDashboard(interval, custom)
  const {types, isLoading: isLoadingType} = useDashboardOperation(interval, custom)
  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <DateRange handleInterval={handleInterval} />
      <Calendar isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} custom={custom} handleCustom={handleCustom} />
      <div className='grid lg:grid-cols-2 gap-4'>
        <Card>
          <CardHeader>% Turnos por motorista</CardHeader>
          <CardBody>
            <Loading isLoading={isLoading}>
              <Chart data={turns} />
            </Loading>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>% Operations por motorista</CardHeader>
          <CardBody>
          <Loading isLoading={isLoading}>
            <Chart data={operations} />
            </Loading>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>% Viagens por motorista</CardHeader>
          <CardBody>
          <Loading isLoading={isLoading}>
            <Chart data={travels} />
          </Loading>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>% Tipo de Operação</CardHeader>
          <CardBody>
          <Loading isLoading={isLoadingType}>
            <Chart data={types} />
          </Loading>
          </CardBody>
        </Card>
      </div>
    </main>
  );
})
