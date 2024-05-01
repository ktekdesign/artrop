import { Spinner } from "@nextui-org/react";
import { ReactNode, Suspense } from "react";

const LoadingComponent = ({isLoading, children}: {isLoading: boolean, children: ReactNode}) => isLoading ? <div className="flex justify-center items-center p-8"><Spinner label="Loading..." color="warning" /></div> : <Suspense>{children}</Suspense>

export default LoadingComponent