import { Spinner } from "@nextui-org/react";
import { ReactNode, memo } from "react";

const Loading = ({isLoading, children}: {isLoading: boolean, children: ReactNode}) => isLoading ? <div className="flex justify-center items-center p-8"><Spinner label="Loading..." color="warning" /></div> : <>{children}</>

export default memo(Loading)