import { RadioGroup } from "@nextui-org/react"
import { memo } from "react"
import Radio from "./custom-radio"

const DateRange = ({handleInterval}: {handleInterval(interval: string): void}) => (
  <RadioGroup onValueChange={handleInterval} defaultValue="1" className="mb-8" orientation="horizontal">
    <Radio value="1">Hoje</Radio>
    <Radio value="7">Ultímos 7 dias</Radio>
    <Radio value="30">Ultímos 30 dias</Radio>
    <Radio value="90">Ultímos 90 dias</Radio>
    <Radio value="180">Ultímos 6 meses</Radio>
    <Radio value="365">Ultímo ano</Radio>
    <Radio value="custom">Personalizado</Radio>
  </RadioGroup>
)

export default memo(DateRange)