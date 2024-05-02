import { Spinner } from "@nextui-org/react";
import { ReactNode, memo } from "react";

const LoadingData = <T,> ({data, children}: {data:T, children: ReactNode}) => !data ? <div className="flex justify-center items-center p-8"><Spinner label="Loading..." color="warning" /></div> : <>{children}</>

export default memo(LoadingData)