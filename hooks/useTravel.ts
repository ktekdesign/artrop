import { OperationType, Status, Travel } from '@prisma/client';
import { useCallback, useMemo } from 'react';
import useSaveMutation from './useSaveMutation';
import { API_TRAVEL_URL, statuses } from '../utils/constants';
import { OperationData } from '../interfaces';
import { Weight } from '../forms/weight';

const useTravel = (operation: OperationData) => {
  const {
    statusesFiltered,
    nextStatus,
    id,
    startedAt,
    operationId,
    operationStartedAt
  } = useMemo(() => {
    const { type, operationId, id, status, operationStartedAt, startedAt } =
      operation;

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
    const next = currentStatus + 1;
    return {
      statusesFiltered,
      nextStatus: { ...statusesFiltered[next], next },
      id,
      startedAt,
      operationId,
      operationStartedAt
    };
  }, [operation]);

  const { isHandlingMutation, onSubmit } = useSaveMutation<Travel, unknown>(
    `${API_TRAVEL_URL}${id}`,
    (data) => {
      if (data?.duration) return `Viagem encerrada em ${data.duration} minutos`;
    }
  );

  const updateStatus = useCallback(() => {
    const statusTime = new Date();

    const data =
      id && id !== undefined
        ? {
            id,
            status: nextStatus.status,
            startedAt,
            ...JSON.parse(`{"${nextStatus.id}": "${statusTime.toISOString()}"}`)
          }
        : {
            status: Status.INICIO_VIAGEM,
            operationId
          };
    onSubmit(data);
  }, [nextStatus, id, startedAt, operationId, onSubmit]);

  const handleWeight = useCallback(
    (data: Weight) => {
      onSubmit({
        id,
        status: nextStatus.status,
        ...data
      });
    },
    [id, nextStatus, onSubmit]
  );
  return {
    statuses: statusesFiltered,
    nextStatus,
    isHandlingMutation,
    updateStatus,
    operationId,
    handleWeight,
    operationStartedAt,
    toggleButton:
      nextStatus.status !== Status.PESO_CARREGADO &&
      nextStatus.status !== Status.PESO_DESCARREGADO,
    toggleColor: Boolean(nextStatus.next % 2)
  };
};

export default useTravel;
