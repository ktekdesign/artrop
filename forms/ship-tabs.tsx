import { Input, Tab, Tabs } from "@heroui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Ship } from "@prisma/client";
import ModalFormFooter from "../app/modal-form-footer";
import formatDate from "../utils/formatDate";
import falsy from "../utils/prevent-falsy";
import { sanitize, transformDate } from "../utils/transform";
import useEntity from "../hooks/useEntity";
import Loading from "../app/loading";
import { errorMessage, getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { memo } from "react";

const schema = yup
  .object({
    name: yup.string().transform(value => sanitize(value)).required(errorMessage.name.required),
    line_up: yup.string().transform(value => sanitize(value)).required(errorMessage.generic.required),
    product: yup.string().transform(value => sanitize(value)).required(errorMessage.generic.required),
    landingAt: yup.date().transform(value => transformDate(value)).required(errorMessage.generic.required),
    departAt: yup.string().nullable().default(null)
  })
  .required()

interface ShipRegister extends Omit<Ship, "id" | "createdAt" | "updatedAt" | "departAt"> {
  departAt?: string | null;
}

export default memo(function ShipTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
   
  const {entity, isLoading, isHandlingMutation, onSubmit, selected, setSelected, handleClose} = useEntity<Ship, ShipRegister>({url})
  
  const handleShip = (data: ShipRegister) => onSubmit({...data, departAt: transformDate(data?.departAt || entity?.departAt?.toString())?.toISOString()})
  
  return (
    <Loading isLoading={isLoading}>
      <Tabs
        fullWidth
        size="md"
        aria-label="Tabs form"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab title="Dados do navio">
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleShip)}>
            <Input {...register("name")} defaultValue={falsy(entity?.name)} label="Nome" placeholder="Digite o nome" isClearable isInvalid={!!errors.name} color={getInputColor(errors.name)} errorMessage={getInputErrorMessage(errors.name)} />
            <Input {...register("line_up")} defaultValue={falsy(entity?.line_up)} label="Line Up" placeholder="Digite o Line Up" isClearable isInvalid={!!errors.line_up} color={getInputColor(errors.line_up)} errorMessage={getInputErrorMessage(errors.line_up)} />
            <Input {...register("product")} defaultValue={falsy(entity?.product)} label="Produto" placeholder="Digite o produto" isClearable isInvalid={!!errors.product} color={getInputColor(errors.product)} errorMessage={getInputErrorMessage(errors.product)} />
            <Input type="date" {...register("landingAt")} defaultValue={falsy(formatDate(entity?.landingAt))} label="Data atracação" isInvalid={!!errors.landingAt} color={getInputColor(errors.landingAt)} errorMessage={getInputErrorMessage(errors.landingAt)} />
            <Input type="date" {...register("departAt")} defaultValue={falsy(formatDate(entity?.departAt))} label="Data Desatracação" />
            <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
          </form>
        </Tab>
      </Tabs>
    </Loading>
  )
})