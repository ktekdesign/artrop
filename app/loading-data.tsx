import { Spinner } from "@nextui-org/react";
import { ReactNode, Suspense, memo } from "react";

const LoadingData = <T,> ({data, children}: {data:T, children: ReactNode}) => <Suspense>{!data ? <div className="flex justify-center items-center p-8"><Spinner label="Loading..." color="warning" /></div> : <>{children}</>}</Suspense>

export default memo(LoadingData)