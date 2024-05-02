import { Input, Tab, Tabs } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Turn } from "@prisma/client";
import ModalFormFooter from "../app/modal-form-footer";
import formatDate from "../utils/formatDate";
import preventNull from "../utils/prevent-null";
import { transformDate, transformNumber } from "../utils/transform";
import useEntity from "../hooks/useEntity";
import Loading from "../app/loading";
import { errorMessage, getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { memo } from "react";

const schema = yup
  .object({
    startedAt: yup.date().transform(value => transformDate(value)).required(errorMessage.generic.required),
    endedAt: yup.string().transform(value => transformDate(value)).nullable().default(null),
    startedKm: yup.number().transform(value => transformNumber(value)).required(errorMessage.generic.required),
    endedKm: yup.number().transform(value => transformNumber(value)).default(null),
    status: yup.boolean().default(false)
  })
  .required()
interface TurnRegister extends Omit<Turn, "id" | "userId" | "customerId" | "endedAt" | "duration"> {
  endedAt?: string | null;
}
export default memo(function TurnTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {entity, isLoading, isHandlingMutation, onSubmit, selected, setSelected} = useEntity<Turn, TurnRegister>({url: url || ""})
  
  return (
    <Loading isLoading={isLoading}>
    <Tabs
      fullWidth
      size="md"
      aria-label="Tabs form"
      selectedKey={selected}
      onSelectionChange={setSelected}
    >
      <Tab title="Detalhes do turno">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input type="date" {...register("startedAt")} defaultValue={preventNull(formatDate(entity?.startedAt))} label="Data e hora inicio" isInvalid={!!errors.startedAt} color={getInputColor(errors.startedAt)} errorMessage={getInputErrorMessage(errors.startedAt)} />
          <Input type="number" {...register("startedKm")} defaultValue={preventNull(entity?.startedKm?.toString())} label="Km Inicio" isClearable isInvalid={!!errors.startedKm} color={getInputColor(errors.startedKm)} errorMessage={getInputErrorMessage(errors.startedKm)} />
          <Input type="date" {...register("endedAt")} defaultValue={preventNull(formatDate(entity?.endedAt))} label="Data e hora Fim" isClearable />
          <Input type="number" {...register("endedKm")} defaultValue={preventNull(entity?.endedKm?.toString())} label="Km Fim" isClearable />
          <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} />
        </form>
      </Tab>
    </Tabs>
    </Loading>
  )
})