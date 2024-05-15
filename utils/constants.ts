import { Status } from '@prisma/client';

export const API_USER_URL = '/api/users/';
export const API_CUSTOMER_URL = '/api/customers/';
export const API_SHIP_URL = '/api/ships/';
export const API_VEHICLE_URL = '/api/vehicles/';
export const API_TURN_URL = '/api/turns/';
export const API_OPERATION_URL = '/api/operations/';
export const API_TRAVEL_URL = '/api/travels/';
export const API_VEHICLESTURN_URL = '/api/vehiclesturn/';
export const API_DASHBOARD_URL = '/api/dashboard/turns/';
export const API_DASHBOARD_OPERATION_URL = '/api/dashboard/operations/';
export const API_REPORTS_URL = '/api/dashboard/users/';
export const timeZone = 'America/Sao_Paulo';
export const renderButtonLabel = (operation?: string) =>
  operation === 'update'
    ? 'Atualize'
    : operation === 'delete'
      ? 'Remove'
      : 'Cadastre';
export const operations = ['Caçamba', 'Prancha', 'Container', 'Entre Armazéns'];
export const statuses = [
  {
    status: Status.INICIO_VIAGEM,
    label: 'Iniciar Viagem',
    id: 'startedAt',
    report: 'Inicio'
  },
  {
    status: Status.CHEGADA_BALANCA_VAZIO,
    label: 'Informar Chegada Balança Vazio',
    id: 'start_balance_unloaded',
    report: 'Ini. Bal. Vazio'
  },
  {
    status: Status.SAIDA_BALANCA_VAZIO,
    label: 'Informar Saída Balança Vazio',
    id: 'end_balance_unloaded',
    report: 'Fim Bal. Vazio'
  },
  {
    status: Status.PESO_DESCARREGADO,
    label: 'Informar Peso',
    id: 'weight_unload',
    report: 'Peso Vazio'
  },
  {
    status: Status.INICIO_CARREGAMENTO,
    label: 'Iniciar Carregamento',
    id: 'start_load',
    report: 'Ini. Carr'
  },
  {
    status: Status.FIM_CARREGAMENTO,
    label: 'Encerrar Carregamento',
    id: 'end_load',
    report: 'Fim Carr'
  },
  {
    status: Status.CHEGADA_BALANCA_CARREGADO,
    label: 'Informar Chegada Balança Carregado',
    id: 'start_balance_loaded',
    report: 'Ini. Bal. Carr'
  },
  {
    status: Status.SAIDA_BALANCA_CARREGADO,
    label: 'Informar Saída Balança Carregado',
    id: 'end_balance_loaded',
    report: 'Fim Bal. Carr'
  },
  {
    status: Status.PESO_CARREGADO,
    label: 'Informar Peso',
    id: 'weight_load',
    report: 'Peso Carr'
  },
  {
    status: Status.INICIO_DESCARREGAMENTO,
    label: 'Iniciar Descarregamento',
    id: 'start_unload',
    report: 'Ini. Desc'
  },
  {
    status: Status.FIM_DESCARREGAMENTO,
    label: 'Encerrar Descarregamento',
    id: 'end_unload',
    report: 'Fim. Desc'
  },
  {
    status: Status.INICIO_TRAVA_CONTAINER,
    label: 'Iniciar Trava Container',
    id: 'start_block_container',
    report: 'Ini. Trava'
  },
  {
    status: Status.FIM_TRAVA_CONTAINER,
    label: 'Encerrar Trava Container',
    id: 'end_block_container',
    report: 'Fim. Trava'
  },
  {
    status: Status.FIM_VIAGEM,
    label: 'Encerrar viagem',
    id: 'endedAt',
    report: 'Fim'
  }
];
