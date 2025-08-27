import { Input, Select, SelectItem, Tab, Tabs } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { Bodytruck, Truck, Vehicle } from "@prisma/client";
import ModalFormFooter from "../app/modal-form-footer";
import falsy from "../utils/prevent-falsy";
import { sanitize, transformJsonValue, transformNumber } from "../utils/transform";
import useEntity from "../hooks/useEntity";
import Loading from "../app/loading";
import { errorMessage, getInputColor, getInputErrorMessage } from "../utils/input-errors";
import { memo, useCallback, useMemo } from "react";

const schema = yup
  .object({
    licence_plate_1: yup.string().transform(value => sanitize(value)).required(errorMessage.generic.required),
    licence_plate_2: yup.string().transform(value => sanitize(value)).default(null),
    licence_plate_3: yup.string().transform(value => sanitize(value)).default(null),
    truck: yup.string<Truck>().oneOf(Object.values(Truck)).default(Truck.TRUC),
    bodytruck: yup.string<Bodytruck>().oneOf(Object.values(Bodytruck)).default(Bodytruck.VIRINHA_CACAMBA),
    info: yup.object({
      brand: yup.string().transform(value => sanitize(value)),
      model: yup.string().transform(value => sanitize(value)),
      year: yup.number().transform(value => transformNumber(value)),
      color: yup.string().transform(value => sanitize(value)),
    }).default(null),
    capacity: yup.number().transform(value => transformNumber(value)).required(errorMessage.generic.required)
  })
  .required()

interface VehicleRegister extends Omit<Vehicle, "id" | "createdAt" | "updatedAt" | "info"> {
  info?: {
    brand?: string;
    model?: string;
    year?: number;
    color?: string;
  } | null
}

export default memo(function VehicleTabs ({buttonLabel, url}: {buttonLabel?: string, url?: string }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  
  const {entity, isLoading, isHandlingMutation, operation, selected, setSelected, onSubmit, handleClose} = useEntity<Vehicle, VehicleRegister>({url})
  const {trucks, bodytrucks, info} = useMemo(() => {
    const trucks: {label: string, value: Truck}[] = [{label: "Truc", value: Truck.TRUC}, {label: "Toco", value: Truck.TOCO}, {label: "Cavalo 4x2", value: Truck.CAVALO_4X2}, {label: "Cavalo 6x2", value: Truck.CAVALO_6X2}, {label: "Cavalo 6x2", value: Truck.CAVALO_6X4}]
    const bodytrucks: {label: string, value: Bodytruck}[] = [{label: "Caçamba", value: Bodytruck.VIRINHA_CACAMBA}, {label: "Porta Container", value: Bodytruck.PORTA_CONTAINER}, {label: "Prancha", value: Bodytruck.PRANCHA}, {label: "Graneleiro", value: Bodytruck.GRANELEIRO}, {label: "Grade Baixa", value: Bodytruck.GRADE_BAIXA}, {label: "Sider", value: Bodytruck.SIDER}]
    const [info] = transformJsonValue([entity?.info])
    return {trucks, bodytrucks, info}
  }, [entity?.info])
  
  const {licence_plate_1, licence_plate_2, licence_plate_3} = entity || {}

  const handleData = async (data: VehicleRegister) => onSubmit({
    ...data,
    licence_plate_2: data.licence_plate_2 ?? falsy(entity?.licence_plate_2) ?? null,
    licence_plate_3: data.licence_plate_3 ?? falsy(entity?.licence_plate_3) ?? null,
    info: data.info ?? info ?? null,
    capacity: data.capacity ?? entity?.capacity ?? null,
    truck: data.truck ?? entity?.truck ?? null,
    bodytruck: data.bodytruck ?? entity?.bodytruck ?? null
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
            <Tab className="flex flex-col gap-2" title="Dados do Caminhão">
                <Input {...register("licence_plate_1")} defaultValue={falsy(licence_plate_1)} label="Placa" placeholder="Digite a placa 1" isClearable isInvalid={!!errors.licence_plate_1} color={getInputColor(errors.licence_plate_1)} errorMessage={getInputErrorMessage(errors.licence_plate_1)} />
                <Input {...register("licence_plate_2")} defaultValue={falsy(licence_plate_2 || undefined)} label="Placa 2" placeholder="Digite a placa 2" isClearable />
                <Input {...register("licence_plate_3")} defaultValue={falsy(licence_plate_3 || undefined)} label="Placa 3" placeholder="Digite a placa 3" isClearable />
                <Input {...register("capacity")} type="number" defaultValue={falsy(entity?.capacity?.toString())} label="Capacidade" isClearable />
                <Controller
                  name="truck"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={trucks}
                      label="Tipo de caminhão"
                      defaultSelectedKeys={[entity?.truck || Truck.TRUC]}
                      placeholder="Escolha o tipo de caminhão"
                      color={getInputColor(errors.truck)}
                      errorMessage={getInputErrorMessage(errors.truck)}
                      isInvalid={!!errors.truck}
                    >
                      {({value, label}: {value: Truck, label: string}) => <SelectItem key={value}>{label}</SelectItem>}
                    </Select>
                  )}
                />
                <Controller
                  name="bodytruck"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      items={bodytrucks}
                      label="Tipo de carroceria"
                      defaultSelectedKeys={[entity?.bodytruck || Bodytruck.VIRINHA_CACAMBA]}
                      placeholder="Escolha o tipo de carroceria"
                      color={getInputColor(errors.bodytruck)}
                      errorMessage={getInputErrorMessage(errors.bodytruck)}
                      isInvalid={!!errors.bodytruck}
                    >
                      {({value, label}: {value: Bodytruck, label: string}) => <SelectItem key={value}>{label}</SelectItem>}
                    </Select>
                  )}
                />
                <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
            </Tab>
            {operation === 'update' && (
              <Tab title="Características">
                <Input {...register("info.brand")} defaultValue={falsy(info?.brand?.toString())} label="Marca" isClearable />
                <Input {...register("info.model")} defaultValue={falsy(info?.model?.toString())} label="Modelo" isClearable />
                <Input {...register("info.year")} type="number" defaultValue={falsy(info?.year?.toString())} label="Ano" isClearable />
                <Input {...register("info.color")} defaultValue={falsy(info?.color?.toString())} label="Cor" isClearable />
                <ModalFormFooter isLoading={isHandlingMutation} buttonLabel={buttonLabel} handleClose={handleClose} />
              </Tab>
            )}
        </Tabs>
      </form>
    </Loading>
  )
})