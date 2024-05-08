'use client';

import Chart from '../../pie-chart-dashboard';
import useDashboard from '../../../hooks/useDashboard';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import Loading from '../../loading';
import useDashboardOperation from '../../../hooks/useDashboardOperation';
import { memo } from 'react';

export default memo(function DashboardPage() {
  const {turns, operations, travels, isLoading} = useDashboard()
  const {types, isLoading: isLoadingType} = useDashboardOperation()
  
  return (
    <main className="grid lg:grid-cols-2 gap-4 p-4 md:p-10 mx-auto max-w-7xl">
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
    </main>
  );
})
