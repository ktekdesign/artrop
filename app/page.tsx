'use client';

import Chart from './pie-chart-dashboard';
import useDashboard from '../hooks/useDashboard';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import LoadingComponent from './loading-component';
import useDashboardOperation from '../hooks/useDashboardOperation';


export default function PlaygroundPage() {
  const {turns, operations, travels, isLoading} = useDashboard()
  const {types, isLoading: isLoadingType} = useDashboardOperation()
  return (
    <main className="grid lg:grid-cols-2 gap-3 p-4 md:p-10 mx-auto max-w-7xl">
      <Card>
        <CardHeader>% Turnos por motorista</CardHeader>
        <CardBody>
          <LoadingComponent isLoading={isLoading}>
            <Chart data={turns} />
          </LoadingComponent>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>% Operations por motorista</CardHeader>
        <CardBody>
        <LoadingComponent isLoading={isLoading}>
          <Chart data={operations} />
          </LoadingComponent>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>% Viagens por motorista</CardHeader>
        <CardBody>
        <LoadingComponent isLoading={isLoading}>
          <Chart data={travels} />
        </LoadingComponent>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>% Tipo de Operação</CardHeader>
        <CardBody>
        <LoadingComponent isLoading={isLoadingType}>
          <Chart data={types} />
        </LoadingComponent>
        </CardBody>
      </Card>
    </main>
  );
}
