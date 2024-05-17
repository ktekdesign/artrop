import { InputNumberFormat } from "@react-input/number-format";
import { InputHTMLAttributes, memo } from "react";

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const NumberInput = ({label, ...props}: NumberInputProps) => (
  <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-sm px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2 is-filled">
    <div className="absolute top-1">
    <label data-slot="label" className="z-10 pointer-events-none origin-top-left rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_theme(fontSize.small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden" 
    htmlFor="endedKm">{label}</label>
    </div>
    <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5">
      <InputNumberFormat
        locales="pt" maximumFractionDigits={0}
        placeholder="Digite a kilometragem final"
        className="mt-8 w-full font-normal bg-transparent !outline-none placeholder:text-foreground-500 focus-visible:outline-none data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 text-small peer pr-6 rtl:pr-0 rtl:pl-6 group-data-[has-value=true]:text-default-foreground is-filled"
        {...props}
      />
    </div>
  </div>
)

export default memo(NumberInput)