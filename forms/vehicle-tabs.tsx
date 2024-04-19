import { Input, Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import submit from "../utils/submit";
import useToast from "../hooks/useToast";
import useModal from "../hooks/useModal";
import { Vehicle } from "@prisma/client";
import ModalFormFooter from "../app/modal-form-footer";
import preventNull from "../utils/prevent-null";
import { sanitize, transformJsonValue, transformNumber } from "../utils/transform";
import useEntity from "../hooks/useEntity";
import LoadingComponent from "../app/loading-component";

const schema = yup
  .object({
    licence_plate_1: yup.string().transform(value => sanitize(value)).required(),
    licence_plate_2: yup.string().transform(value => sanitize(value)).default(null),
    licence_plate_3: yup.string().transform(value => sanitize(value)).default(null),
    info: yup.object({
      brand: yup.string().transform(value => sanitize(value)),
      model: yup.string().transform(value => sanitize(value)),
      year: yup.number().transform(value => transformNumber(value)),
      color: yup.string().transform(value => sanitize(value)),
    }),
    capacity: yup.number().transform(value => transformNumber(value)).default(0)
  })
  .required()

interface VehicleRegister extends Omit<Vehicle, "id" | "createdAt" | "updatedAt" | "truck" | "bodytruck" | "info"> {
  truck?: string;
  bodytruck?: string;
  info?: {
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
  }
}

export default function VehicleTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
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

  const {entity, setEntity} = useEntity<Vehicle>({url, id})
  const info = transformJsonValue(entity?.info)
  
  const handleUpdate = (data: VehicleRegister) => {
    if(!data.licence_plate_2) data.licence_plate_2 = entity?.licence_plate_2 || null
    if(!data.licence_plate_3) data.licence_plate_3 = entity?.licence_plate_3 || null
    if(!data.info?.brand) data.info = info
    if(!data.capacity) data.capacity = entity?.capacity || null
    return data
  }
  const onSubmit = async (data: VehicleRegister) => setEntity(await submit(setIsLoading, handleToast, handleClose, {url, data: handleUpdate(data), action: {id, operation}}))
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
            <Tab title="Dados do Caminhão">
              <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("licence_plate_1")} defaultValue={preventNull(entity?.licence_plate_1)} label="Placa" placeholder="Digite a placa 1" />
                <p>{errors.licence_plate_1?.message}</p>
                <Input {...register("licence_plate_2")} defaultValue={preventNull(entity?.licence_plate_2)} label="Placa 2" placeholder="Digite a placa 2" />
                <p>{errors.licence_plate_2?.message}</p>
                <Input {...register("licence_plate_3")} defaultValue={preventNull(entity?.licence_plate_3)} label="Placa 3" placeholder="Digite a placa 3" />
                <p>{errors.licence_plate_3?.message}</p>
                <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
              </form>
            </Tab>
            {operation === 'update' && (
            <Tab title="Características">
              <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("info.brand")} defaultValue={preventNull(info?.brand)} label="Marca" />
                <p>{errors.info?.brand?.message}</p>
                <Input {...register("info.model")} defaultValue={preventNull(info?.model)} label="Modelo" />
                <p>{errors.info?.model?.message}</p>
                <Input {...register("info.year")} type="number" defaultValue={preventNull(info?.year?.toString())} label="Ano" />
                <p>{errors.info?.year?.message}</p>
                <Input {...register("capacity")} type="number" defaultValue={preventNull(entity?.capacity?.toString())} label="Capacidade" />
                <p>{errors.capacity?.message}</p>
                <Input {...register("info.color")} defaultValue={preventNull(info?.color)} label="Cor" />
                <p>{errors.info?.color?.message}</p>
                <ModalFormFooter isLoading={isLoading} buttonLabel={buttonLabel} />
              </form>
            </Tab>
            )}
        </Tabs>
      </LoadingComponent>
  )
}