import { Spinner } from "@nextui-org/react";
import { ReactNode } from "react";

const LoadingComponent = ({isLoading, children}: {isLoading: boolean, children: ReactNode}) => isLoading ? <div className="flex justify-center items-center p-8"><Spinner label="Loading..." color="warning" /></div> : <>{children}</>

export default LoadingComponent