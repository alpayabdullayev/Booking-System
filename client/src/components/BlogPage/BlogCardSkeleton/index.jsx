import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="cursor-pointer rounded-md shadow-md group">
      <div className="rounded-t-md overflow-hidden">
        <Skeleton className="w-full object-cover h-[500px] rounded-t-md" />
      </div>
      <div className="flex flex-col gap-4 py-10 px-10 rounded-md">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <div className="rounded-md items-center flex gap-5">
          <div className="rounded-full">
            <Skeleton className="rounded-full w-14 h-14 object-cover" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-4 w-1/3 " />

            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
