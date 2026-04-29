import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdStore,
  MdShoppingBag,
  MdFeedback,
  MdMenu,
  MdClose,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const AdminSideBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { auth, logout } = useAuth();
  const admin = auth?.admin;

  const linkClasses = ({ isActive }) =>
    isActive
      ? "group flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100 shadow-sm transition"
      : "group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-emerald-700 transition";

  const handleLogOut = async () => {
    await logout();
    navigate("/login", {
      replace: true,
      state: { message: "Logged out successfully!" },
    });
  };

  const closeMobile = () => setOpen(false);

  const renderProfileBlock = () => (
    <div className="px-6 py-6 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-600 text-white text-lg font-bold shadow-sm">
          {admin?.name?.[0]?.toUpperCase() || "A"}
        </div>

        <div className="min-w-0">
          <p className="text-gray-900 font-semibold truncate">
            {admin?.name || "Admin"}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">Administrator</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-gray-50 border border-gray-100 px-4 py-3">
        <p className="text-xs text-gray-500">Signed in as</p>
        <p className="text-sm font-semibold text-gray-900 truncate">
          {admin?.email || "admin@mail.com"}
        </p>
      </div>
    </div>
  );

  const renderMenuLinks = (onClick) => (
    <div className="space-y-1">
      <p className="px-2 pb-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Menu
      </p>

      <NavLink to="/admin/profile" className={linkClasses} onClick={onClick}>
        <CgProfile
          size={20}
          className="text-gray-500 group-hover:text-emerald-600"
        />
        Profile
      </NavLink>

      <NavLink to="/admin/dashboard" className={linkClasses} onClick={onClick}>
        <MdDashboard
          size={20}
          className="text-gray-500 group-hover:text-emerald-600"
        />
        Dashboard
      </NavLink>

      <NavLink to="/admin/vendors" className={linkClasses} onClick={onClick}>
        <MdPeople
          size={20}
          className="text-gray-500 group-hover:text-emerald-600"
        />
        Vendors
      </NavLink>

      <NavLink to="/admin/users" className={linkClasses} onClick={onClick}>
        <FaUsers
          size={18}
          className="text-gray-500 group-hover:text-emerald-600"
        />
        Users
      </NavLink>

      <NavLink to="/admin/shops" className={linkClasses} onClick={onClick}>
        <MdStore
          size={20}
          className="text-gray-500 group-hover:text-emerald-600"
        />
        Shops
      </NavLink>

      <NavLink to="/admin/orders" className={linkClasses} onClick={onClick}>
        <MdShoppingBag
          size={20}
          className="text-gray-500 group-hover:text-emerald-600"
        />
        Orders
      </NavLink>

      <NavLink to="/admin/contacts" className={linkClasses} onClick={onClick}>
        <MdFeedback
          size={20}
          className="text-gray-500 group-hover:text-emerald-600"
        />
        Contacts
      </NavLink>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <MdMenu size={24} className="text-gray-800" />
        </button>

        <p className="font-semibold text-gray-900 tracking-tight">
          Admin Panel
        </p>

        <div className="w-10" />
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-72 bg-white border-r border-gray-200 fixed top-0 left-0 h-[calc(100vh-5rem)] z-40">
        {renderProfileBlock()}

        <nav className="flex flex-col justify-between h-full px-4 py-5">
          {renderMenuLinks()}

          <div className="pt-4">
            <button
              type="button"
              onClick={handleLogOut}
              aria-label="Logout"
              title="Logout"
              className="w-full group flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-red-200 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <FiLogOut size={20} className="text-red-600" />
                Logout
              </span>
              <span className="text-xs text-red-600 group-hover:translate-x-0.5 transition">
                →
              </span>
            </button>

            <p className="mt-3 text-[11px] text-gray-400 px-1">
              Version 1.0 • Admin
            </p>
          </div>
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Close overlay"
            title="Close"
          />

          <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-2xl border-r border-gray-200 flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/90 backdrop-blur shrink-0">
              <p className="font-semibold text-gray-900">Menu</p>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 transition"
                aria-label="Close menu"
                title="Close"
              >
                <MdClose size={22} className="text-gray-800" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {renderProfileBlock()}

              <nav className="flex flex-col gap-1 px-4 py-5">
                {renderMenuLinks(closeMobile)}
              </nav>
            </div>

            <div className="shrink-0 px-4 pb-5 pt-3 border-t border-gray-100 bg-white">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  handleLogOut();
                }}
                aria-label="Logout"
                title="Logout"
                className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border border-red-200 bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition"
              >
                <span className="flex items-center gap-3">
                  <FiLogOut size={20} className="text-red-600" />
                  Logout
                </span>
                <span className="text-xs text-red-600">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSideBar;
