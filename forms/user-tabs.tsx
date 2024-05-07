import { Input, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { Role, User } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import ModalFormFooter from "../app/modal-form-footer";
import formatDate from "../utils/formatDate";
import preventNull from "../utils/prevent-null";
import { cpfRegExp, phoneRegExp } from "../utils/regex";
import { getOnlyDigit, sanitize, transformDate, transformJsonValue } from "../utils/transform";
import AddressForm, {schemaAddress} from "./address";
import useEntity from "../hooks/useEntity";
import Loading from "../app/loading";
import { errorMessage, getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { memo, useCallback, useMemo } from "react";
import useCep from "../hooks/useCep";
import { CEP } from "cep-promise";

const schema = yup
  .object({
    name: yup.string().transform(value => sanitize(value)).required(errorMessage.name.required),
    govID: yup.string().matches(cpfRegExp, errorMessage.cpf.invalid).transform(value => getOnlyDigit(value)).required(errorMessage.cpf.required),
    phone: yup.string().matches(phoneRegExp, errorMessage.phone.invalid).transform(value => getOnlyDigit(value)).required(errorMessage.phone.required),
    email: yup.string().email(errorMessage.email.invalid).required(errorMessage.email.required),
    password: yup.string().transform(value => sanitize(value)).notRequired(),
    password2: yup.string().transform(value => sanitize(value)).notRequired(),
    type: yup.string<Role>().oneOf(Object.values(Role)).default(Role.DRIVER),
    address: schemaAddress,
    cnh: yup.object({
      id: yup.string().transform(value => sanitize(value)).nullable().default(null),
      expires: yup.string().nullable().default(null),
      category: yup.string().transform(value => sanitize(value)).nullable().default(null)
    }).nullable().default(null)
  })
  .required()

interface UserRegister extends Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'password' | 'cnh_expires'> {
  password?: string | null;
  password2?: string | null;
  cnh_expires?: string | null;
}

export default memo(function UserTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  
  const {entity, isLoading, isHandlingMutation, operation, selected, setSelected, onSubmit, handleClose} = useEntity<User, UserRegister>({url})
  
  const {cnh, address, roles} = useMemo(() => {
    const [cnh, address] = transformJsonValue([entity?.cnh, entity?.address])
    const roles: {label: string, value: Role}[] = [{label: "Admin", value: Role.ADMIN}, {label: "Staff", value: Role.STAFF}, {label: "Motorista", value: Role.DRIVER}]
    return {cnh, address, roles}
  }, [entity?.cnh, entity?.address])
  
  const setAddress = useCallback((cep: CEP) => {
    if(cep?.state) setValue("address.state", cep.state)
    if(cep?.city) setValue("address.city", cep.city)
    if(cep?.neighborhood) setValue("address.neighborhood", cep.neighborhood)
    if(cep?.street) setValue("address.street", cep.street)
  }, [])

  const {cep, handleCepChange} = useCep(setAddress)

  const handleInsert = useCallback((data: UserRegister) => {
    if(!data.password) throw new Error("Escolha uma senha para continuar")
    if(data.password !== data.password2) throw new Error("As senhas digitadas não são as mesmas")
    delete data.password2
    return data
  }, [])

  const handleUpdate = useCallback((data: UserRegister) => {
    const [cnhData, addressData] = transformJsonValue([data.cnh, data.address])
    const cnh_expires = preventNull(cnhData?.expires)
    if(!addressData?.code && address?.code) data.address = address
    if(!cnhData?.id && cnh?.id) data.cnh = cnh
    data.cnh_expires = transformDate(cnh_expires || cnh?.expires?.toString())?.toISOString()
    if((!data.type || data.type === Role.DRIVER) && entity?.type) data.type = entity.type
    return data
  }, [address, cnh, entity?.type])
  
  const handleData = (data: UserRegister) => onSubmit((operation === "insert" ? handleInsert : handleUpdate)(data))
  
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
            <Input {...register("name")} defaultValue={preventNull(entity?.name)} label="Nome" placeholder="Digite o nome" isClearable isInvalid={!!errors.name} color={getInputColor(errors.name)} errorMessage={getInputErrorMessage(errors.name)} />
            <Input {...register("govID")} defaultValue={preventNull(entity?.govID)} label="CPF" placeholder="Digite o CPF" isClearable isInvalid={!!errors.govID} color={getInputColor(errors.govID)} errorMessage={getInputErrorMessage(errors.govID)} />
            <Input type="email" {...register("email")} defaultValue={preventNull(entity?.email)} label="Email" placeholder="Digite o e-mail" isClearable isInvalid={!!errors.email} color={getInputColor(errors.email)} errorMessage={getInputErrorMessage(errors.email)} />
            <Input type="tel" {...register("phone")} defaultValue={preventNull(entity?.phone)} label="Telephone" placeholder="Digite o celular" isClearable isInvalid={!!errors.phone} color={getInputColor(errors.phone)} errorMessage={getInputErrorMessage(errors.phone)} />
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
                  color={getInputColor(errors.type)}
                  errorMessage={getInputErrorMessage(errors.type)}
                  isInvalid={!!errors.type}
                >
                  {({value, label}: {value: string, label: string}) => <SelectItem key={value} value={value}>{label}</SelectItem>}
                </Select>
              )}
            />
            {operation === 'insert' &&
              <>
                <Input type="password" {...register("password")} label="Senha" placeholder="Escolha uma senha" />
                <Input type="password" {...register("password2")} label="Confirmação Senha" placeholder="Digite novamente a mesma senha" />
              </>
            }
            <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
          </div>
        </Tab>
        {operation === 'update' && (
          <Tab title="CNH">
            <div className="form-row">
              <Input isClearable {...register("cnh.id")} defaultValue={preventNull(cnh?.id)} label="CNH" placeholder="Digite o registro da CNH" />
              <Input type="date" {...register("cnh.expires")} defaultValue={preventNull(formatDate(cnh?.expires))} label="Expiração" placeholder="Qual é a data de expiração" />
              <Input isClearable {...register("cnh.category")} defaultValue={preventNull(cnh?.category)} label="Categoria" placeholder="Digite a categoria da CNH" />
              <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
            </div>
          </Tab>
        )}
        {operation === 'update' && (
          <Tab title="Endereço">
              <AddressForm {...{address: entity?.address, cep, handleCepChange, props: [
                {...register("address.code")},
                {...register("address.street")},
                {...register("address.number")},
                {...register("address.complement")},
                {...register("address.neighborhood")},
                {...register("address.city")},
                {...register("address.state")}
              ]}} />
              <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
          </Tab>
        )}
      </Tabs>
      </form>
    </Loading>
  )
})