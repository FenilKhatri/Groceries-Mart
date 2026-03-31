import { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaHouseUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Logo from "../../assets/Logo.webp";
import { useAuth } from "../../context/AuthContext";
import { logoutApi } from "../../api/logOutApi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { auth, logout } = useAuth();
  const role = auth?.role;
  const vendorId = auth?.vendor?._id || auth?.vendor?.id || null;

  const activeLinks = ({ isActive }) =>
    isActive
      ? "text-emerald-700 border-b-4 border-emerald-600 pb-2 font-semibold"
      : "text-gray-600 hover:text-emerald-400 font-semibold hover:border-b-4 pb-2 hover:border-emerald-400";

  const baseCenter = useMemo(
    () => [
      { to: "/", label: "Home" },
      { to: "/products", label: "Products" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
    [],
  );

  const guestCenter = baseCenter;

  const userCenter = useMemo(
    () => [
      ...baseCenter,
      { to: "/users/cart", label: "Cart" },
      { to: "/users/orders", label: "Orders" },
    ],
    [baseCenter],
  );

  const vendorCenter = useMemo(
    () => [
      ...baseCenter,
      ...(vendorId
        ? [{ to: `/vendors/${vendorId}/profile`, label: "Vendor Panel" }]
        : []),
    ],
    [baseCenter, vendorId],
  );

  const adminCenter = useMemo(
    () => [...baseCenter, { to: "/admin/profile", label: "Admin Panel" }],
    [baseCenter],
  );

  const { centerLinks, showAuthButtons, panelLink, panelLabel, showLogout } =
    useMemo(() => {
      if (role === "admin") {
        return {
          centerLinks: adminCenter,
          showAuthButtons: false,
          panelLink: "/admin/profile",
          panelLabel: "Admin Panel",
          showLogout: true,
        };
      }

      if (role === "vendor") {
        return {
          centerLinks: vendorCenter,
          showAuthButtons: false,
          panelLink: vendorId ? `/vendors/${vendorId}/profile` : null,
          panelLabel: "Vendor Panel",
          showLogout: true,
        };
      }

      if (role === "user") {
        return {
          centerLinks: userCenter,
          showAuthButtons: false,
          panelLink: "/users/profile",
          panelLabel: "User Profile",
          showLogout: true,
        };
      }

      return {
        centerLinks: guestCenter,
        showAuthButtons: true,
        panelLink: null,
        panelLabel: "",
        showLogout: false,
      };
    }, [role, guestCenter, userCenter, vendorCenter, adminCenter, vendorId]);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (error) {
      console.error("Logout API failed:", error);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-transparent shadow-xl backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3 sm:px-10">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img
            src={Logo}
            alt="web-logo"
            width="76"
            height="56"
            className="h-12 w-auto sm:h-14"
          />
        </NavLink>

        <ul className="hidden items-center gap-8 md:flex">
          {centerLinks.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={activeLinks}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          {showAuthButtons && (
            <>
              <NavLink
                to="/login"
                className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-white transition duration-300 hover:bg-emerald-500"
              >
                <FaUser size={15} /> Login
              </NavLink>

              <NavLink
                to="/vendor/login"
                className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-3 py-2 text-white transition duration-300 hover:bg-orange-500"
              >
                <FaHouseUser size={15} /> Vendor Login
              </NavLink>
            </>
          )}

          {role && panelLink && (
            <Link
              to={panelLink}
              className="cursor-pointer rounded-lg bg-emerald-600 px-4 py-2 text-white transition-all hover:bg-emerald-500"
            >
              {panelLabel}
            </Link>
          )}

          {role && showLogout && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex cursor-pointer items-center justify-center gap-3 rounded-lg bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600"
            >
              Logout <MdLogout />
            </button>
          )}
        </div>

        <button
          type="button"
          className="text-3xl text-emerald-700 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <div className="px-4 pb-4 sm:px-10 md:hidden">
          <ul className="flex flex-col gap-4 pt-2">
            {centerLinks.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={activeLinks}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-3">
            {showAuthButtons && (
              <>
                <NavLink
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border-2 border-emerald-400 px-4 py-2 text-center transition-all hover:bg-emerald-400 hover:text-white"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/vendor/login"
                  onClick={() => setOpen(false)}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-center text-white transition-all hover:bg-orange-500"
                >
                  Vendor Login
                </NavLink>
              </>
            )}

            {role && panelLink && (
              <Link
                to={panelLink}
                onClick={() => setOpen(false)}
                className="rounded-lg bg-emerald-600 px-4 py-2 text-center text-white transition-all hover:bg-emerald-500"
              >
                {panelLabel}
              </Link>
            )}

            {role && showLogout && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 rounded-lg bg-red-600 px-4 py-2 text-center text-white transition-all hover:bg-red-500"
              >
                Logout <MdLogout />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
