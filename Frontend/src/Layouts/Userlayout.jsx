import { Outlet } from "react-router-dom";
import UserSideBar from "../pages/user/SideBar";

const UserLayout = () => {
  return (
    <div className="bg-slate-100">
      <div className="min-h-screen max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row items-start justify-start gap-5">
        <UserSideBar />

        <main className="w-full md:flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
