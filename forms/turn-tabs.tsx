import { Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import useToast from "../hooks/useToast";
import useModal from "../hooks/useModal";
import { Turn } from "@prisma/client";
import ModalFormFooter from "../app/modal-form-footer";
import formatDate from "../utils/formatDate";
import preventNull from "../utils/prevent-null";
import { transformDate, transformNumber } from "../utils/transform";
import useEntity from "../hooks/useEntity";
import LoadingComponent from "../app/loading-component";

const schema = yup
  .object({
    startedAt: yup.date().transform(value => transformDate(value)).required(),
    endedAt: yup.string().transform(value => transformDate(value)).nullable().default(null),
    startedKm: yup.number().transform(value => transformNumber(value)).required(),
    endedKm: yup.number().transform(value => transformNumber(value)).default(null),
    status: yup.boolean().default(false)
  })
  .required()
interface TurnRegister extends Omit<Turn, "id" | "userId" | "customerId" | "endedAt"> {
  endedAt?: string | null;
}
export default function TurnTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const {handleToast} = useToast()
  const {action: {id, operation}, handleClose} = useModal()
  const isInsert = operation === 'insert'
  const [selected, setSelected] = useState<string | number>(0);
  const [isLoading, setIsLoading] = useState(false)
  const {entity, setEntity} = useEntity<Turn>({url, id})
  
  const onSubmit = async (data: TurnRegister) => {
    const response = await submit(setIsLoading, handleToast, handleClose, {url, data, action: {id, operation}})
    if(response) {
      setEntity(response)
      handleClose()
    }
  }
  return (
    <LoadingComponent isLoading={!isInsert && !entity.id}>
    <Tabs
      fullWidth
      size="md"
      aria-label="Tabs form"
      selectedKey={selected}
      onSelectionChange={setSelected}
      disabledKeys={!id ? [1, 2] : []}
    >
      <Tab title="Detalhes do turno">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input type="date" {...register("startedAt")} defaultValue={preventNull(formatDate(entity?.startedAt))} label="Data e hora inicio" />
          <p>{errors.startedAt?.message}</p>
          <Input type="number" {...register("startedKm")} defaultValue={preventNull(entity?.startedKm?.toString())} label="Km Inicio" />
          <p>{errors.startedKm?.message}</p>
          <Input type="date" {...register("endedAt")} defaultValue={preventNull(formatDate(entity?.endedAt))} label="Data e hora Fim" />
          <p>{errors.endedAt?.message}</p>
          <Input type="number" {...register("endedKm")} defaultValue={preventNull(entity?.endedKm?.toString())} label="Km Fim" />
          <p>{errors.endedKm?.message}</p>
          <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
        </form>
      </Tab>
    </Tabs>
    </LoadingComponent>
  )
}