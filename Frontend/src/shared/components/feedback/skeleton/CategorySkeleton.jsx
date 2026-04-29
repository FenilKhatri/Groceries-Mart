import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategorySkeleton = ({ count = 8 }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center gap-3"
          >
            <Skeleton width={70} height={70} borderRadius={60} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CategorySkeleton;
