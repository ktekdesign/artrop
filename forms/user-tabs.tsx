import { Input, Select, SelectItem, Spinner, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { OperationType, Role, User } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import useToast from "../hooks/useToast";
import useModal from "../hooks/useModal";
import ModalFormFooter from "../app/modal-form-footer";
import formatDate from "../utils/formatDate";
import getError from "../utils/getError";
import preventNull from "../utils/prevent-null";
import { cepRegExp, cpfRegExp, phoneRegExp } from "../utils/regex";
import { getOnlyDigit, sanitize, transformDate, transformJsonValue } from "../utils/transform";
import AddressForm from "./address";
import useEntity from "../hooks/useEntity";
import LoadingComponent from "../app/loading-component";

const schema = yup
  .object({
    name: yup.string().transform(value => sanitize(value)).required(),
    govID: yup.string().matches(cpfRegExp.regex, cpfRegExp.message).transform(value => getOnlyDigit(value)).required(),
    phone: yup.string().matches(phoneRegExp.regex, phoneRegExp.message).required(),
    email: yup.string().email().required(),
    password: yup.string().transform(value => sanitize(value)).notRequired(),
    password2: yup.string().transform(value => sanitize(value)).notRequired(),
    type: yup.string<Role>().oneOf(Object.values(Role)).default(Role.DRIVER),
    address: yup.object({
      code: yup.string().matches(cepRegExp.regex, cepRegExp.message).nullable().default(null),
      address: yup.string().transform(value => sanitize(value)).nullable().default(null),
      number: yup.string().transform(value => sanitize(value)).nullable().default(null),
      complement: yup.string().transform(value => sanitize(value)).nullable().default(null),
      district: yup.string().transform(value => sanitize(value)).nullable().default(null),
      city: yup.string().transform(value => sanitize(value)).nullable().default(null),
      state: yup.string().transform(value => sanitize(value)).nullable().default(null)
    }).nullable().default(null),
    cnh: yup.object({
      id: yup.string().transform(value => sanitize(value)).nullable().default(null),
      expires: yup.string().transform(value => transformDate(value)).nullable().default(null),
      category: yup.string().transform(value => sanitize(value)).nullable().default(null)
    }).nullable().default(null)
  })
  .required()

interface UserRegister extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password' | 'cnh_expires'> {
  password?: string | null;
  password2?: string | null;
  cnh_expires?: string | null;
}

export default function UserTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
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
  const [selected, setSelected] = useState<string | number>(0);
  const [isLoading, setIsLoading] = useState(false)
  const roles: {label: string, value: Role}[] = [{label: "Admin", value: Role.ADMIN}, {label: "Staff", value: Role.STAFF}, {label: "Motorista", value: Role.DRIVER}]
  
  const {entity, setEntity} = useEntity<User>({url, id})
  const cnh = transformJsonValue(entity?.cnh)
  const address = transformJsonValue(entity?.address)
  
  const handleInsert = (data: UserRegister) => {
    if(!data.password) throw new Error("Escolha uma senha para continuar")
    if(data.password !== data.password2) throw new Error("As senhas digitadas não são as mesmas")
    delete data.password2
    return data
  }

  const handleUpdate = (data: UserRegister) => {
    const cnhData = transformJsonValue(data.cnh)
    const cnh_expires = preventNull(cnhData.expires)
    if(!transformJsonValue(data.address).code && address.code) data.address = address
    if(!cnhData.id && cnh.id) data.cnh = cnh
    data.cnh_expires = cnh_expires ? cnh_expires : cnh?.expires?.toString()
    if((!data.type || data.type === Role.DRIVER) && entity?.type?.length) data.type = entity.type
    return data
  }

  const onSubmit = async (data: UserRegister) => {
    try {
      const userData = isInsert ? handleInsert(data) : handleUpdate(data)
      setEntity(await submit(setIsLoading, handleToast, handleClose, {url, data: userData, action: {id, operation}}))
    } catch (err) {
      handleToast(getError(err))
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
      >
        <Tab title="Dados pessoais">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <Input {...register("name")} defaultValue={preventNull(entity?.name)} label="Nome" placeholder="Digite o nome" />
            <p>{errors.name?.message}</p>
            <Input {...register("govID")} defaultValue={preventNull(entity?.govID)} label="CPF" placeholder="Digite o CPF" />
            <p>{errors.govID?.message}</p>
            <Input type="email" {...register("email")} defaultValue={preventNull(entity?.email)} label="Email" placeholder="Digite o e-mail" />
            <p>{errors.email?.message}</p>
            <Input type="tel" {...register("phone")} defaultValue={preventNull(entity?.phone)} label="Telephone" placeholder="Digite o celular" />
            <p>{errors.phone?.message}</p>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  items={roles}
                  label="Tipo de usuário"
                  defaultSelectedKeys={[entity?.type || Role.DRIVER]}
                  placeholder="Escolha o tipo de usuário"
                >
                  {({value, label}) => <SelectItem key={value} value={value}>{label}</SelectItem>}
                </Select>
              )}
            />
            <p>{errors.type?.message}</p>
            {isInsert &&
              <>
                <Input type="password" {...register("password")} label="Senha" placeholder="Escolha uma senha" />
                <Input type="password" {...register("password2")} label="Confirmação Senha" placeholder="Digite novamente a mesma senha" />
              </>
            }
            <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
          </div>
          </form>
        </Tab>
        {operation === 'update' && (
          <Tab title="CNH">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <Input {...register("cnh.id")} defaultValue={preventNull(cnh?.id)} label="CNH" placeholder="Digite o registro da CNH" />
              <Input type="date" {...register("cnh.expires")} defaultValue={preventNull(formatDate(cnh?.expires))} label="Expiração" placeholder="Qual é a data de expiração" />
              <Input {...register("cnh.category")} defaultValue={preventNull(cnh?.category)} label="Categoria" placeholder="Digite a categoria da CNH" />
              <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
            </div>
            </form>
          </Tab>
        )}
        {operation === 'update' && (
          <Tab title="Endereço">
            <form onSubmit={handleSubmit(onSubmit)}>
            <AddressForm {...{address: entity?.address, props: [
              {...register("address.code")},
              {...register("address.address")},
              {...register("address.number")},
              {...register("address.complement")},
              {...register("address.district")},
              {...register("address.city")},
              {...register("address.state")}]}} />
            <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
            </form>
          </Tab>
        )}
      </Tabs>
    </LoadingComponent>
  )
}