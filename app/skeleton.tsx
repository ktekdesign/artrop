import React, { memo } from "react";
import {Card, Skeleton} from "@nextui-org/react";

export default memo(function LoadingSkeleton() {
  return (
    <Card className="bg-default-200/50 p-4">
      <div className="w-full flex gap-4 items-center">
        <Skeleton className="flex rounded-full w-12 h-12" />  
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    </Card>
  );
})
