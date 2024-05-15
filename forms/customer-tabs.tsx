import { Input, Tab, Tabs } from "@nextui-org/react";
import { memo, useCallback, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import ModalFormFooter from "../app/modal-form-footer";
import { Customer, OperationType } from "@prisma/client";
import preventNull from "../utils/prevent-null";
import { cpfRegExp, phoneRegExp } from "../utils/regex";
import { getOnlyDigit, sanitize, transformJsonValue } from "../utils/transform";
import enumValue from "../utils/enumValue";
import { operations } from "../utils/constants";
import AddressForm, { schemaAddress } from "./address";
import useEntity from "../hooks/useEntity";
import Loading from "../app/loading";
import { errorMessage, getInputColor, getInputErrorMessage } from "../utils/input-errors";
import useCep from "../hooks/useCep";
import { CEP } from "cep-promise";

const schema = yup
  .object({
    name: yup.string().transform(value => sanitize(value)).required(errorMessage.name.required),
    govID: yup.string().matches(cpfRegExp, errorMessage.cnpj.invalid).transform(value => getOnlyDigit(value)).required(errorMessage.cnpj.required),
    phone: yup.string().matches(phoneRegExp, errorMessage.phone.invalid).transform(value => getOnlyDigit(value)).required(errorMessage.phone.required),
    email: yup.string().email().required(),
    operation: yup.array<OperationType[]>().transform(value => enumValue(value, Object.values(OperationType))).default([]),
    address: schemaAddress,
    info: yup.object({
      name: yup.string().transform(value => sanitize(value)).nullable().default(null),
      name_in_charge: yup.string().transform(value => sanitize(value)).nullable().default(null),
      phone: yup.string().matches(phoneRegExp, errorMessage.phone.invalid).transform(value => getOnlyDigit(value)).nullable().default(null)
    }).nullable().default(null)
  })
  .required()

type CustomerRegister = Omit<Customer, "id" | 'createdAt' | 'updatedAt'>

export default memo(function CustomerTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {entity, isLoading, isHandlingMutation, onSubmit, operation, selected, setSelected, handleClose} = useEntity<Customer, CustomerRegister>({url})
  const [info, address] = useMemo(() => transformJsonValue([entity?.info, entity?.address]), [entity?.info, entity?.address])
  
  const setAddress = (cep: CEP) => {
    if(cep?.state) setValue("address.state", cep.state)
    if(cep?.city) setValue("address.city", cep.city)
    if(cep?.neighborhood) setValue("address.neighborhood", cep.neighborhood)
    if(cep?.street) setValue("address.street", cep.street)
  }

  const {cep, handleCepChange} = useCep(setAddress)
  
  const handleData = (data: CustomerRegister) => onSubmit({
    ...data,
    address: data.address ?? address,
    info: data.info ?? info,
    operation: data.operation ?? entity?.operation
  })
  
  return (
    <Loading isLoading={isLoading}>
    <form onSubmit={handleSubmit(handleData)}>
      <Tabs
        fullWidth
        size="md"
        aria-label="Tabs form"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
      <Tab title="Dados pessoais">
        <div className="form-row">
          <Input {...register("name")} defaultValue={preventNull(entity?.name)} label="Nome" placeholder="Digite o nome empresarial" isClearable isInvalid={!!errors.name} color={getInputColor(errors.name)} errorMessage={getInputErrorMessage(errors.name)} />
          <Input {...register("govID")} defaultValue={preventNull(entity?.govID)} label="CNPJ" placeholder="Digite o CNPJ" isClearable isInvalid={!!errors.govID} color={getInputColor(errors.govID)} errorMessage={getInputErrorMessage(errors.govID)} />
          <Input type="email" {...register("email")} defaultValue={preventNull(entity?.email)} label="Email" placeholder="Digite o e-mail" isClearable isInvalid={!!errors.email} color={getInputColor(errors.email)} errorMessage={getInputErrorMessage(errors.email)} />
          <Input type="tel" {...register("phone")} defaultValue={preventNull(entity?.phone)} label="Telephone" placeholder="Digite o celular" isClearable isInvalid={!!errors.phone} color={getInputColor(errors.phone)} errorMessage={getInputErrorMessage(errors.phone)} />
          <CheckboxGroup
            label={`Escolha as operações. ${operation !== 'insert' && entity?.operation ? `Current: (${entity?.operation.join(', ')})` : '' }`}
            orientation="horizontal"
          >
            {operations.map((operation, key) => <Controller
              key={key}
              name={`operation.${key}`}
              control={control}
              render={({ field }) => <Checkbox {...field} value={operation}>{operation}</Checkbox>}
            />
            )}
          </CheckboxGroup>
        </div>
        <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
      </Tab>
    {operation === 'update' && (
      <Tab title="Endereço">
        <AddressForm {...{address: entity?.address, cep, handleCepChange, props: [
          {...register("address.code")},
          {...register("address.street")},
          {...register("address.number")},
          {...register("address.complement")},
          {...register("address.neighborhood")},
          {...register("address.city")},
          {...register("address.state")}]}} />
        <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
      </Tab>
      )}
      {operation === 'update' && (
        <Tab title="Demais">
          <div className="form-row">
            <Input {...register("info.name")} defaultValue={preventNull(info?.name)} label="Nome Fantasia" placeholder="Digite o nome fantasia" isClearable />
            <Input {...register("info.name_in_charge")} defaultValue={preventNull(info?.name_in_charge)} label="Nome do Responsável" placeholder="Digite o nome do responsável" isClearable />
            <Input {...register("info.phone")} type="tel"  defaultValue={preventNull(info?.phone)} label="Contato do Responsável" placeholder="Digite o celular do responsável" isClearable />
          </div>
          <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
        </Tab>
      )}
    </Tabs>
  </form>
  </Loading>
  )
})
