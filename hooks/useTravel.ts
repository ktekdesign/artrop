import { OperationType, Status, Travel } from '@prisma/client';
import { useCallback, useMemo } from 'react';
import useSaveMutation from './useSaveMutation';
import { API_TRAVEL_URL, statuses } from '../utils/constants';
import { OperationData } from '../interfaces';
import { Weight } from '../forms/weight';

const useTravel = (operation: OperationData) => {
  const { type, operationId, id, status, operationStartedAt } = operation;
  const { statusesFiltered, nextStatus } = useMemo(() => {
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
    return {
      statusesFiltered,
      nextStatus: currentStatus + 1
    };
  }, [status, type]);

  const { isHandlingMutation, onSubmit } = useSaveMutation<Travel, unknown>(
    `${API_TRAVEL_URL}${id}`,
    (data) => {
      if (data?.duration) return `Viagem encerrada em ${data.duration} minutos`;
    }
  );

  const updateStatus = useCallback(() => {
    const statusToUpdate = statusesFiltered[nextStatus].status;
    const statusTime = new Date();

    const data =
      id && id !== undefined
        ? {
            id,
            status: statusToUpdate,
            ...JSON.parse(
              `{"${statuses[nextStatus].id}": "${statusTime.toISOString()}"}`
            )
          }
        : {
            status: Status.INICIO_VIAGEM,
            operationId
          };
    onSubmit(data);
  }, [statusesFiltered, nextStatus, id, operationId, onSubmit]);

  const handleWeight = useCallback(
    (data: Weight) => {
      const statusToUpdate = statuses[nextStatus].status;

      onSubmit({
        id,
        status: statusToUpdate,
        ...data
      });
    },
    [id, nextStatus, onSubmit]
  );
  return {
    statuses: statusesFiltered,
    nextStatus: statusesFiltered[nextStatus],
    isHandlingMutation,
    updateStatus,
    operationId,
    handleWeight,
    operationStartedAt,
    toggleButton:
      statuses[nextStatus].status !== Status.PESO_CARREGADO &&
      statuses[nextStatus].status !== Status.PESO_DESCARREGADO,
    toggleColor: Boolean(nextStatus % 2)
  };
};

export default useTravel;
