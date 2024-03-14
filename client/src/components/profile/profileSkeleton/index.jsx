import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="flex items-center gap-10">
      <div className="mb-4 ">
        <div className="w-52 bg-gray-200 rounded-full h-52 object-cover">
          <Skeleton />
        </div>
      </div>
      <div>
        <h1 className="text-2xl w-[300px] h-[24px] bg-gray-200 font-bold mb-4">
          <Skeleton />
        </h1>

        <h2 className="text-lg w-[300px] h-[20px] bg-gray-200 font-semibold mb-2">
          <span className="text-gray-400"></span>
          <Skeleton />
        </h2>
        <h2 className="text-lg w-[300px] h-[20px] bg-gray-200 font-semibold mb-2">
          <span className="text-gray-400"></span>
          <Skeleton />
        </h2>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
