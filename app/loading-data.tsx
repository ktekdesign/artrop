import { ReactNode, memo } from "react";
import Skeleton from "./skeleton";

const LoadingData = <T,> ({data, children}: {data:T, children: ReactNode}) => !data ? <Skeleton /> : <>{children}</>

export default memo(LoadingData)