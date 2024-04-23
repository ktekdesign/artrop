import { Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import useToast from "../hooks/useToast";
import useModal from "../hooks/useModal";
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
import LoadingComponent from "../app/loading-component";
import { errorMessage, getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { useMutation } from 'react-query';

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

interface CustomerRegister extends Omit<Customer, "id" | 'createdAt' | 'updatedAt'> {}

export default function CustomerTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const {entity, isLoading, saveMutation, operation, selected, setSelected} = useEntity<Customer, CustomerRegister>({url})
  const info = transformJsonValue(entity?.info)
  const address = transformJsonValue(entity?.address)
  
  const handleUpdate = (data: CustomerRegister) => {
    if(!transformJsonValue(data.address).code && address.code) data.address = address
    if(!transformJsonValue(data.info).name && info.name) data.info = info
    if(!data.operation.length && entity?.operation.length) data.operation = entity.operation
    return data
  }

  const handleBlur = (code: string) => {
    if(code.length !== 9) return
      fetch(`https://cdn.apicep.com/file/apicep/${code}.json`, {
        mode: 'no-cors',
        })
      .then(data => data.json())
      .then(console.log)
      .catch (console.error)
  }
  
  const onSubmit = async (data: CustomerRegister) => saveMutation.mutate(handleUpdate(data))
  
  return (
    <LoadingComponent isLoading={isLoading}>
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <ModalFormFooter isLoading={saveMutation.isLoading} buttonLabel={buttonLabel} />
      </Tab>
    {operation === 'update' && (
      <Tab title="Endereço">
        <AddressForm address={entity?.address} props={[
          {...register("address.code")},
          {...register("address.address")},
          {...register("address.number")},
          {...register("address.complement")},
          {...register("address.district")},
          {...register("address.city")},
          {...register("address.state")}]} />
        <ModalFormFooter isLoading={saveMutation.isLoading} buttonLabel={buttonLabel} />
      </Tab>
      )}
      {operation === 'update' && (
        <Tab title="Demais">
          <div className="form-row">
            <Input {...register("info.name")} defaultValue={preventNull(info?.name)} label="Nome Fantasia" placeholder="Digite o nome fantasia" isClearable />
            <Input {...register("info.name_in_charge")} defaultValue={preventNull(info?.name_in_charge)} label="Nome do Responsável" placeholder="Digite o nome do responsável" isClearable />
            <Input {...register("info.phone")} type="tel"  defaultValue={preventNull(info?.phone)} label="Contato do Responsável" placeholder="Digite o celular do responsável" isClearable />
          </div>
          <ModalFormFooter isLoading={saveMutation.isLoading} buttonLabel={buttonLabel} />
        </Tab>
      )}
    </Tabs>
  </form>
  </LoadingComponent>
  )
}