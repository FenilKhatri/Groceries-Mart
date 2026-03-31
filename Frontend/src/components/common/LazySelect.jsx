import { Suspense, lazy } from "react";

const ReactSelect = lazy(() => import("react-select"));

const LazySelect = (props) => {
  return (
    <Suspense
      fallback={
        <div className="animate-pulse text-sm text-gray-500">
          Loading select...
        </div>
      }
    >
      <ReactSelect {...props} />
    </Suspense>
  );
};

export default LazySelect;