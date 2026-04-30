
import { Outlet } from "react-router-dom";
import VendorSideBar from "../pages/vendor/SideBar";

const VendorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <VendorSideBar />

      {/* content */}
      <main className="min-h-screen md:ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default VendorLayout;