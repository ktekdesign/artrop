import { Input, InputProps, forwardRef } from "@nextui-org/react"
import { Ref } from "react"
import preventNull from "../utils/prevent-null"
import { JsonValue } from "@prisma/client/runtime/library"

const AddressForm = forwardRef(({address, props}: {address?: JsonValue, props: InputProps[]}, ref: Ref<HTMLInputElement>) => 
  typeof address === "object" && !Array.isArray(address) && <div className="form-row">
    <Input {...props[0]} defaultValue={preventNull(address?.code)} label="CEP" placeholder="Digite o seu CEP" />
    <Input {...props[1]} defaultValue={preventNull(address?.address)} label="Rua" placeholder="Digite a logradura" />
    <Input {...props[2]} type="number" defaultValue={preventNull(address?.number)} label="Numero" placeholder="Digite o N" />
    <Input {...props[3]} defaultValue={preventNull(address?.complement)} label="Complemento" placeholder="Digite o complemento se tiver" />
    <Input {...props[4]} defaultValue={preventNull(address?.district)} label="Bairro" placeholder="Digite o bairro" />
    <Input {...props[5]} defaultValue={preventNull(address?.city)} label="Cidade" placeholder="Digite a cidade" />
    <Input {...props[6]} defaultValue={preventNull(address?.state)} label="Estado" placeholder="Digite o estado" />
  </div>
)

export default AddressForm