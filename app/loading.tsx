import { Spinner } from "@nextui-org/react";
import { ReactNode, Suspense, memo } from "react";

const Loading = ({isLoading, children}: {isLoading: boolean, children: ReactNode}) => <Suspense>{isLoading ? <div className="flex justify-center items-center p-8"><Spinner label="Loading..." color="warning" /></div> : <>{children}</>}</Suspense>

export default memo(Loading)