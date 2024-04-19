import { Spinner } from "@nextui-org/react";
import { ReactNode } from "react";

const LoadingComponent = ({isLoading, children}: {isLoading: boolean, children: ReactNode}) => isLoading ? <Spinner label="Loading..." color="warning" /> : <>{children}</>

export default LoadingComponent