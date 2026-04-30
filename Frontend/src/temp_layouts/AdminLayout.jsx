import { Outlet } from "react-router-dom";
import AdminSideBar from "../pages/admin/SideBar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSideBar />

      <main className="min-h-screen md:ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;