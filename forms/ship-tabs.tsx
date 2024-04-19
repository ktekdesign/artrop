import { Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import useToast from "../hooks/useToast";
import useModal from "../hooks/useModal";
import { Ship } from "@prisma/client";
import ModalFormFooter from "../app/modal-form-footer";
import formatDate from "../utils/formatDate";
import preventNull from "../utils/prevent-null";
import { sanitize, transformDate } from "../utils/transform";
import useEntity from "../hooks/useEntity";
import LoadingComponent from "../app/loading-component";

const schema = yup
  .object({
    name: yup.string().transform(value => sanitize(value)).required(),
    line_up: yup.string().transform(value => sanitize(value)).required(),
    product: yup.string().transform(value => sanitize(value)).required(),
    landingAt: yup.date().transform(value => transformDate(value)).required(),
    departAt: yup.string().transform(value => transformDate(value)).nullable().default(null)
  })
  .required()

interface ShipRegister extends Omit<Ship, "id" | "createdAt" | "updatedAt" | "departAt"> {
  departAt?: string | null;
}
export default function ShipTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
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
  
  const {entity, setEntity} = useEntity<Ship>({url, id})
  
  const onSubmit = async (data: ShipRegister) => setEntity(await submit(setIsLoading, handleToast, handleClose, {url, data, action: {id, operation}}))
  
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
      <Tab title="Dados do navio">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("name")} defaultValue={preventNull(entity?.name)} label="Nome" placeholder="Digite o nome" />
          <p>{errors.name?.message}</p>
          <Input {...register("line_up")} defaultValue={preventNull(entity?.line_up)} label="Line Up" placeholder="Digite o Line Up" />
          <p>{errors.line_up?.message}</p>
          <Input {...register("product")} defaultValue={preventNull(entity?.product)} label="Produto" placeholder="Digite o produto" />
          <p>{errors.product?.message}</p>
          <Input type="date" {...register("landingAt")} defaultValue={preventNull(formatDate(entity?.landingAt))} label="Data atracação" />
          <p>{errors.landingAt?.message}</p>
          <Input type="date" {...register("departAt")} defaultValue={preventNull(formatDate(entity?.departAt))} label="Data Desatracação" />
          <p>{errors.departAt?.message}</p>
          <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
        </form>
      </Tab>
    </Tabs>
    </LoadingComponent>
  )
}