'use client';

import Chart from '../pie-chart-dashboard';
import useDashboard from '../../hooks/useDashboard';
import { Card, CardBody, CardHeader, Tab, Tabs } from '@nextui-org/react';
import Loading from '../loading';
import useDashboardOperation from '../../hooks/useDashboardOperation';
import { memo, useState } from 'react';


export default memo(function DashboardPage() {
  const {turns, operations, travels, isLoading} = useDashboard()
  const {types, isLoading: isLoadingType} = useDashboardOperation()
  const [selected, setSelected] = useState<string | number>(0);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Tabs
        fullWidth
        aria-label="Tabs form"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab title="Grafícos">
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
      </Tab>
      <Tab title="Relatórios">
      </Tab>
      </Tabs>
    </main>
  );
})
