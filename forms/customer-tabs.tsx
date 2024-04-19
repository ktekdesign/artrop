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
import { cepRegExp, cpfRegExp, phoneRegExp } from "../utils/regex";
import { getOnlyDigit, sanitize, transformJsonValue } from "../utils/transform";
import enumValue from "../utils/enumValue";
import { operations } from "../utils/constants";
import AddressForm from "./address";
import useEntity from "../hooks/useEntity";
import LoadingComponent from "../app/loading-component";

const schema = yup
  .object({
    name: yup.string().transform(value => sanitize(value)).required(),
    govID: yup.string().matches(cpfRegExp.regex, cpfRegExp.message).transform(value => getOnlyDigit(value)).required(),
    phone: yup.string().matches(phoneRegExp.regex, phoneRegExp.message).transform(value => getOnlyDigit(value)).required(),
    email: yup.string().email().required(),
    operation: yup.array<OperationType[]>().transform(value => enumValue(value, Object.values(OperationType))).default([]),
    address: yup.object({
      code: yup.string().matches(cepRegExp.regex, cepRegExp.message).nullable().default(null),
      address: yup.string().transform(value => sanitize(value)).nullable().default(null),
      number: yup.string().transform(value => sanitize(value)).nullable().default(null),
      complement: yup.string().transform(value => sanitize(value)).nullable().default(null),
      district: yup.string().transform(value => sanitize(value)).nullable().default(null),
      city: yup.string().transform(value => sanitize(value)).nullable().default(null),
      state: yup.string().transform(value => sanitize(value)).nullable().default(null)
    }).nullable().default(null),
    info: yup.object({
      name: yup.string().transform(value => sanitize(value)).nullable().default(null),
      name_in_charge: yup.string().transform(value => sanitize(value)).nullable().default(null),
      phone: yup.string().matches(phoneRegExp.regex, phoneRegExp.message).transform(value => getOnlyDigit(value)).nullable().default(null)
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

  const {handleToast} = useToast()
  const {action: {id, operation}, handleClose} = useModal()
  const isInsert = operation === 'insert'
  const [selected, setSelected] = useState<string | number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const {entity, setEntity} = useEntity<Customer>({url, id})
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
  
  const onSubmit = async (data: CustomerRegister) => setEntity(await submit(setIsLoading, handleToast, handleClose, {url, data: handleUpdate(data), action: {id, operation}}))
  
  return (
    <LoadingComponent isLoading={!isInsert && !entity.id}>
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
          <Input {...register("name")} defaultValue={preventNull(entity?.name)} label="Nome" placeholder="Digite o nome empresarial" />
          <p>{errors.name?.message}</p>
          <Input {...register("govID")} defaultValue={preventNull(entity?.govID)} label="CNPJ" placeholder="Digite o CNPJ" />
          <p>{errors.govID?.message}</p>
          <Input type="email" {...register("email")} defaultValue={preventNull(entity?.email)} label="Email" placeholder="Digite o e-mail" />
          <p>{errors.email?.message}</p>
          <Input type="tel" {...register("phone")} defaultValue={preventNull(entity?.phone)} label="Telephone" placeholder="Digite o celular" />
          <p>{errors.phone?.message}</p>
          <CheckboxGroup
            label={`Escolha as operações. ${!isInsert && entity?.operation ? `Current: (${entity?.operation.join(', ')})` : '' }`}
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
        <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
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
        <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
      </Tab>
      )}
      {operation === 'update' && (
        <Tab title="Demais">
          <div className="form-row">
            <Input {...register("info.name")} defaultValue={preventNull(info?.name)} label="Nome Fantasia" placeholder="Digite o nome fantasia" />
            <Input {...register("info.name_in_charge")} defaultValue={preventNull(info?.name_in_charge)} label="Nome do Responsável" placeholder="Digite o nome do responsável" />
            <Input {...register("info.phone")} type="tel"  defaultValue={preventNull(info?.phone)} label="Contato do Responsável" placeholder="Digite o celular do responsável" />
          </div>
          <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
        </Tab>
      )}
    </Tabs>
  </form>
  </LoadingComponent>
  )
}