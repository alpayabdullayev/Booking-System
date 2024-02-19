import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const MainCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <Skeleton className="h-52 w-full rounded-xl" />
      <div className="p-4 flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex  justify-between items-center">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default MainCardSkeleton;
