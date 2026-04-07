import { Outlet, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const VendorProducts = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Vendor Panel
            </p>

            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Vendor Products
            </h1>

            <p className="mt-2 text-sm text-gray-600">
              Manage your products here.
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            aria-label="Back"
            title="Back"
            className="flex items-center jusitfy-center gap-5 px-3 py-2 rounded-md border border-gray-300 shadow-md hover:bg-gray-100 transition duration-300 cursor-pointer"
          >
            <IoMdArrowRoundBack /> Back
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default VendorProducts;