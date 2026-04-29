import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserProfileSkeleton = () => {
  return (
    <>
      <div className="w-full flex flex-col space-y-6">
        <div className="w-full">
          <p className="text-sm font-medium text-gray-600">Name</p>
          <Skeleton width="full" height={40} />
        </div>
        <div className="w-full">
          <p className="text-sm font-medium text-gray-600">Email</p>
          <Skeleton width="full" height={40} />
        </div>
        <div className="w-full">
          <p className="text-sm font-medium text-gray-600">Phone</p>
          <Skeleton width="full" height={40} />
        </div>
        <Skeleton width={120} height={40} />
      </div>
    </>
  );
};

export default UserProfileSkeleton;
