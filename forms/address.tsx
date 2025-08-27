import { Input, InputProps, forwardRef } from "@heroui/react"
import { ChangeEvent, Ref, memo } from "react"
import falsy from "../utils/prevent-falsy"
import { JsonValue } from "@prisma/client/runtime/library"
import * as yup from "yup"
import { getOnlyDigit, sanitize } from "../utils/transform";
import { CEP } from 'cep-promise'

export const schemaAddress = yup.object({
  code: yup.string().transform(value => getOnlyDigit(value)).nullable().default(null),
  street: yup.string().transform(value => sanitize(value)).nullable().default(null),
  number: yup.string().transform(value => sanitize(value)).nullable().default(null),
  complement: yup.string().transform(value => sanitize(value)).nullable().default(null),
  neighborhood: yup.string().transform(value => sanitize(value)).nullable().default(null),
  city: yup.string().transform(value => sanitize(value)).nullable().default(null),
  state: yup.string().transform(value => sanitize(value)).nullable().default(null)
}).nullable().default(null)

const AddressForm = forwardRef(({address, cep, handleCepChange, props}: {address?: JsonValue, cep?: CEP, handleCepChange: (e: ChangeEvent<HTMLInputElement>) => void, props: InputProps[]}, ref: Ref<HTMLInputElement>) => {
  return (typeof address === "object" && !Array.isArray(address) && <div className="form-row">
    <Input {...props[0]} isClearable onChange={handleCepChange} defaultValue={falsy(address?.code?.toString())} type="number" label="CEP" placeholder="Digite o seu CEP" />
    <Input {...props[1]} isClearable defaultValue={falsy(address?.street?.toString())} {...(cep?.street ? {value: cep.street, disabled: true} : {disabled: false})} label="Rua" placeholder="Digite a logradura" />
    <Input {...props[2]} isClearable type="number" defaultValue={falsy(address?.number?.toString())} label="Numero" placeholder="Digite o N" />
    <Input {...props[3]} isClearable defaultValue={falsy(address?.complement?.toString())} label="Complemento" placeholder="Digite o complemento se tiver" />
    <Input {...props[4]} isClearable defaultValue={falsy(address?.neighborhood?.toString())} {...(cep?.neighborhood ? {value: cep.neighborhood, disabled: true} : {disabled: false})} label="Bairro" placeholder="Digite o bairro" />
    <Input {...props[5]} isClearable defaultValue={falsy(address?.city?.toString())} {...(cep?.city ? {value: cep.city, disabled: true} : {disabled: false})} label="Cidade" placeholder="Digite a cidade" />
    <Input {...props[6]} isClearable defaultValue={falsy(address?.state?.toString())} {...(cep?.state ? {value: cep.state, disabled: true} : {disabled: false})} label="Estado" placeholder="Digite o estado" />
  </div>
  )
})

export default memo(AddressForm)