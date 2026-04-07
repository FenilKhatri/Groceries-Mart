import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdMenu,
  MdClose,
  MdOutlineDashboard,
  MdStore,
  MdOutlineInventory2,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut, FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { getMyShop } from "../../api/vendorApi";
import { useAuth } from "../../context/AuthContext";
import { logoutApi } from "../../api/logOutApi";
import { RiLockPasswordLine } from "react-icons/ri";

const VendorSideBar = () => {
  const [open, setOpen] = useState(false);
  const [shopData, setShopData] = useState(null);
  const [loadingAccess, setLoadingAccess] = useState(true);

  const { logout, auth } = useAuth();
  const navigate = useNavigate();

  const role = auth?.role;
  const vendor = auth?.vendor || null;
  const vendorId = vendor?._id;

  const isVendorSession = role === "vendor";
  const vendorLoaded = !!vendor;
  const vendorStatus = vendor?.status || null;

  const canAccessShop = vendorStatus === "approved";
  const shopApproved =
    !!shopData && (shopData?.status === "approved" || !!shopData?.approvedAt);
  const canAccessRest = vendorStatus === "approved" && shopApproved;

  const linkClasses = ({ isActive }) =>
    isActive
      ? "group flex items-center gap-3 px-4 py-3 rounded-xl bg-orange-50 text-orange-700 font-semibold border border-orange-100 shadow-sm transition"
      : "group flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-orange-700 transition";

  const lockedClasses =
    "flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 bg-gray-50 cursor-not-allowed border border-gray-200 w-full text-left";

  const getLockMessage = () => {
    if (isVendorSession && !vendorLoaded) return "Loading vendor profile...";
    if (loadingAccess) return "Checking access...";
    if (role !== "vendor") return "Unauthorized.";
    if (!vendorStatus) return "Loading vendor status...";

    if (vendorStatus !== "approved") {
      return "Your vendor account must be approved first.";
    }

    if (!shopData) return "Create your shop first.";
    const approved = shopData?.status === "approved" || !!shopData?.approvedAt;

    if (!approved) return "Your shop must be approved first.";
    return "";
  };

  const handleLogOut = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  const fetchShopOnly = async () => {
    if (!isVendorSession) return;
    if (!vendorLoaded) return;

    try {
      setLoadingAccess(true);

      if (vendorStatus !== "approved") {
        setShopData(null);
        return;
      }

      const res = await getMyShop(vendorId);

      const shop = res?.data?.shop || null;
      setShopData(shop);
    } catch (err) {
      setShopData(null);
      console.error(err);
      toast.error(err?.message || "Failed to verify access!");
    } finally {
      setLoadingAccess(false);
    }
  };

  useEffect(() => {
    if (auth?.isCheckingAuth) return;

    if (!isVendorSession) {
      setShopData(null);
      setLoadingAccess(false);
      return;
    }

    if (!vendor) {
      setLoadingAccess(true);
      return;
    }

    fetchShopOnly();
  }, [auth?.isCheckingAuth, isVendorSession, vendor, vendorStatus]);

  const LockIcon = () => <FiLock className="shrink-0" />;

  const NavContent = useMemo(
    () =>
      function NavContent({ onLinkClick }) {
        return (
          <nav className="flex flex-col px-4 py-5 gap-1">
            <NavLink
              to={`/vendors/${vendorId}/profile`}
              className={linkClasses}
              onClick={onLinkClick}
            >
              <CgProfile size={20} />
              Profile
            </NavLink>

            {canAccessRest ? (
              <NavLink
                to={`/vendors/${vendorId}/dashboard`}
                className={linkClasses}
                onClick={onLinkClick}
              >
                <MdOutlineDashboard size={20} />
                Dashboard
              </NavLink>
            ) : (
              <button
                type="button"
                aria-label="Dashboard"
                title="Dashboard"
                className={lockedClasses}
                onClick={() => toast.info(getLockMessage())}
              >
                <LockIcon />
                Dashboard
              </button>
            )}

            {canAccessShop ? (
              <NavLink
                to={`/vendors/${vendorId}/shop`}
                className={linkClasses}
                onClick={onLinkClick}
              >
                <MdStore size={20} />
                Shop
              </NavLink>
            ) : (
              <button
                type="button"
                aria-label="Shop"
                title="Shop"
                className={lockedClasses}
                onClick={() => toast.info(getLockMessage())}
              >
                <LockIcon />
                Shop
              </button>
            )}

            {canAccessRest ? (
              <NavLink
                to={`/vendors/${vendorId}/products`}
                className={linkClasses}
                onClick={onLinkClick}
              >
                <MdOutlineInventory2 size={20} />
                Products
              </NavLink>
            ) : (
              <button
                type="button"
                aria-label="Products"
                title="Products"
                className={lockedClasses}
                onClick={() => toast.info(getLockMessage())}
              >
                <LockIcon />
                Products
              </button>
            )}

            <NavLink
              to={`/vendors/${vendorId}/update-password`}
              className={linkClasses}
              onClick={onLinkClick}
            >
              <RiLockPasswordLine size={20} />
              Update Password
            </NavLink>
          </nav>
        );
      },
    [canAccessRest, canAccessShop, loadingAccess, vendorStatus, shopData],
  );

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-xl hover:bg-gray-100"
          aria-label="Open menu"
          title="Open Menu"
        >
          <MdMenu size={24} />
        </button>

        <p className="font-semibold">Vendor Panel</p>
        <div className="w-10" />
      </header>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-label="Close overlay"
            title="Close Overlay"
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
            <div className="px-4 py-4 border-b border-gray-100 flex items-center justify-between">
              <p className="font-semibold">Vendor Panel</p>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100"
                aria-label="Close menu"
                title="Close Menu"
              >
                <MdClose size={22} />
              </button>
            </div>

            <div className="px-4 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-orange-600 text-white font-bold">
                  {vendor?.name?.[0]?.toUpperCase() || "V"}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">
                    {vendor?.name || "Vendor"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {vendor?.email || "-"}
                  </p>
                </div>
              </div>
            </div>

            <NavContent onLinkClick={() => setOpen(false)} />

            <div className="mt-auto px-4 pb-5">
              <button
                onClick={handleLogOut}
                aria-label="Logout"
                title="Logout"
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-red-200 bg-red-100 text-red-800 font-semibold hover:bg-red-200 transition-all"
              >
                <span className="flex items-center gap-3">
                  <FiLogOut size={20} />
                  Logout
                </span>
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="hidden md:flex md:flex-col md:w-72 bg-white border-r border-gray-200 fixed top-0 left-0 h-screen z-40">
        <div className="px-6 py-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-orange-600 text-white font-bold">
              {vendor?.name?.[0]?.toUpperCase() || "V"}
            </div>

            <div className="min-w-0">
              <p className="font-semibold truncate">
                {vendor?.name || "Vendor"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {vendor?.email || "-"}
              </p>
              <p className="text-[11px] text-gray-400 mt-1">Vendor Panel</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-4 pt-4">
            <p className="text-xs font-semibold text-gray-400 px-2">MENU</p>
          </div>

          <div className="px-2 pb-4">
            <NavContent />
          </div>
        </div>

        <div className="px-4 py-5 border-t border-gray-100 shrink-0">
          <button
            onClick={handleLogOut}
            aria-label="Logout"
            title="Logout"
            className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-red-200 bg-red-100 text-red-800 font-semibold hover:bg-red-200 hover:rounded-3xl cursor-pointer transition-all"
          >
            <span className="flex items-center gap-3">
              <FiLogOut size={20} />
              Logout
            </span>
            <span aria-hidden>→</span>
          </button>

          <p className="text-xs text-gray-400 mt-4 px-1">
            Version 1.0 • Vendor
          </p>
        </div>
      </aside>
    </>
  );
};

export default VendorSideBar;
