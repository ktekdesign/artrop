import { Input, InputProps, forwardRef } from "@nextui-org/react"
import { Ref, memo } from "react"
import preventNull from "../utils/prevent-null"
import { JsonValue } from "@prisma/client/runtime/library"
import * as yup from "yup"
import { getOnlyDigit, sanitize } from "../utils/transform";

export const schemaAddress = yup.object({
  code: yup.string().transform(value => getOnlyDigit(value)).nullable().default(null),
  address: yup.string().transform(value => sanitize(value)).nullable().default(null),
  number: yup.string().transform(value => sanitize(value)).nullable().default(null),
  complement: yup.string().transform(value => sanitize(value)).nullable().default(null),
  district: yup.string().transform(value => sanitize(value)).nullable().default(null),
  city: yup.string().transform(value => sanitize(value)).nullable().default(null),
  state: yup.string().transform(value => sanitize(value)).nullable().default(null)
}).nullable().default(null)

const AddressForm = forwardRef(({address, props}: {address?: JsonValue, props: InputProps[]}, ref: Ref<HTMLInputElement>) => 
  typeof address === "object" && !Array.isArray(address) && <div className="form-row">
    <Input isClearable {...props[0]} defaultValue={preventNull(address?.code)} type="number" label="CEP" placeholder="Digite o seu CEP" />
    <Input isClearable {...props[1]} defaultValue={preventNull(address?.address)} label="Rua" placeholder="Digite a logradura" />
    <Input isClearable {...props[2]} type="number" defaultValue={preventNull(address?.number)} label="Numero" placeholder="Digite o N" />
    <Input isClearable {...props[3]} defaultValue={preventNull(address?.complement)} label="Complemento" placeholder="Digite o complemento se tiver" />
    <Input isClearable {...props[4]} defaultValue={preventNull(address?.district)} label="Bairro" placeholder="Digite o bairro" />
    <Input isClearable {...props[5]} defaultValue={preventNull(address?.city)} label="Cidade" placeholder="Digite a cidade" />
    <Input isClearable {...props[6]} defaultValue={preventNull(address?.state)} label="Estado" placeholder="Digite o estado" />
  </div>
)

export default memo(AddressForm)