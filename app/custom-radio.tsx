import { Radio, RadioProps, cn } from "@heroui/react";
import { memo } from "react";

const CustomRadio = ({children, ...props}: RadioProps) => (
  <Radio
    {...props}
    classNames={{
      base: cn(
        "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
        "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-2 p-2 border-2 border-transparent",
        "data-[selected=true]:border-primary"
      ),
    }}
  >
    {children}
  </Radio>
)

export default memo(CustomRadio);