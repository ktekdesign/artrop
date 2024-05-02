import { OperationType, Status, Travel } from '@prisma/client';
import { minutesDiff } from '../utils/transform';
import { useCallback, useMemo } from 'react';
import useSaveMutation from './useSaveMutation';
import { API_TRAVEL_URL } from '../utils/constants';
import { OperationData } from '../interfaces';
import { Weight } from '../forms/weight';

const useTravel = (operation: OperationData) => {
  const url = API_TRAVEL_URL;

  const { type, operationId, id, status, startedAt, operationStartedAt } =
    operation;
  const [statusesFiltered, nextStatus] = useMemo(() => {
    const statuses = [
      {
        status: Status.INICIO_VIAGEM,
        label: 'Iniciar Viagem',
        field: 'startedAt'
      },
      {
        status: Status.INICIO_CARREGAMENTO,
        label: 'Iniciar Carregamento',
        field: 'start_load'
      },
      {
        status: Status.FIM_CARREGAMENTO,
        label: 'Encerrar Carregamento',
        field: 'end_load'
      },
      {
        status: Status.CHEGADA_BALANCA_CARREGADO,
        label: 'Informar Chegada Balança',
        field: 'start_balance_loaded'
      },
      {
        status: Status.SAIDA_BALANCA_CARREGADO,
        label: 'Informar Saída Balança',
        field: 'end_balance_loaded'
      },
      {
        status: Status.PESO_CARREGADO,
        label: 'Informar Peso',
        field: 'weight_load'
      },
      {
        status: Status.INICIO_DESCARREGAMENTO,
        label: 'Iniciar Descarregamento',
        field: 'start_unload'
      },
      {
        status: Status.FIM_DESCARREGAMENTO,
        label: 'Encerrar Descarregamento',
        field: 'end_unload'
      },
      {
        status: Status.CHEGADA_BALANCA_VAZIO,
        label: 'Informar Retorno Balança',
        field: 'start_balance_unloaded'
      },
      {
        status: Status.SAIDA_BALANCA_VAZIO,
        label: 'Informar Saída Balança',
        field: 'end_balance_unloaded'
      },
      {
        status: Status.PESO_DESCARREGADO,
        label: 'Informar Peso',
        field: 'weight_unload'
      },
      {
        status: Status.INICIO_TRAVA_CONTAINER,
        label: 'Iniciar Trava Container',
        field: 'start_block_container'
      },
      {
        status: Status.FIM_TRAVA_CONTAINER,
        label: 'Encerrar Trava Container',
        field: 'end_block_container'
      },
      { status: Status.FIM_VIAGEM, label: 'Encerrar viagem', field: 'endedAt' }
    ];
    const statusesFiltered =
      type !== OperationType.VIRINHA_CONTAINER
        ? statuses.filter(
            (data) =>
              data.status !== Status.INICIO_TRAVA_CONTAINER &&
              data.status !== Status.FIM_TRAVA_CONTAINER
          )
        : statuses;
    const currentStatus = statusesFiltered.findIndex(
      (index) => index.status === status
    );
    return [statusesFiltered, currentStatus + 1];
  }, [status, type]);

  const { isHandlingMutation, onSubmit } = useSaveMutation<Travel, unknown>(
    `${url}${id}`,
    (data) => {
      if (data?.duration) return `Viagem encerrada em ${data.duration} minutos`;
    }
  );

  const updateStatus = useCallback(() => {
    const statusToUpdate = statusesFiltered[nextStatus].status;
    const statusTime = new Date();
    const duration =
      statusToUpdate === Status.FIM_VIAGEM
        ? minutesDiff(statusTime, startedAt)
        : 0;
    const data =
      id && id !== undefined
        ? {
            id,
            status: statusToUpdate,
            duration,
            ...JSON.parse(
              `{"${statusesFiltered[nextStatus].field}": "${statusTime.toISOString()}"}`
            )
          }
        : {
            status: Status.INICIO_VIAGEM,
            operationId
          };
    onSubmit(data);
  }, [id, nextStatus, operationId, onSubmit, statusesFiltered, startedAt]);

  const handleWeight = useCallback(
    (data: Weight) => {
      const statusToUpdate = statusesFiltered[nextStatus].status;

      onSubmit({
        id,
        status: statusToUpdate,
        ...data
      });
    },
    [id, nextStatus, onSubmit, statusesFiltered]
  );
  return {
    nextStatus: statusesFiltered[nextStatus],
    isHandlingMutation,
    updateStatus,
    operationId,
    handleWeight,
    operationStartedAt,
    toggleButton:
      statusesFiltered[nextStatus].status !== Status.PESO_CARREGADO &&
      statusesFiltered[nextStatus].status !== Status.PESO_DESCARREGADO,
    toggleColor: Boolean(nextStatus % 2)
  };
};

export default useTravel;
