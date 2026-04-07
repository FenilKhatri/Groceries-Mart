import { NavLink } from "react-router-dom";
import { FaUser, FaBox } from "react-icons/fa";
import { userProfile } from "../../api/userApi";
import { useEffect, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";

const UserSideBar = () => {
  const activeLinks = ({ isActive }) =>
    `flex w-full items-center gap-3 rounded-l-md px-4 py-3 font-semibold transition duration-300
     ${
       isActive
         ? "bg-emerald-100 text-emerald-600 border-l-4 border-emerald-500"
         : "text-gray-400 hover:bg-emerald-100/40 hover:text-emerald-500/80"
     }`;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const userDetails = async () => {
    try {
      setLoading(true);
      const res = await userProfile();
      setUser(res.user || null);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  return (
    <div className="w-full md:w-72 md:sticky md:top-25">
      <div className="flex flex-col">
        {/* Profile */}
        <div className="w-full flex flex-col items-center justify-center gap-1 p-4 border-b border-gray-200">
          {loading ? (
            <>
              <Skeleton height={55} width={55} borderRadius={40} />
              <Skeleton height={15} width={100} />
              <Skeleton height={15} width={150} />
            </>
          ) : (
            <>
              <p className="bg-gray-200/80 border font-bold border-gray-500 rounded-full py-2 px-4">
                {user?.name?.[0].toUpperCase()}
              </p>
              <p className="font-bold">{user?.name}</p>
              <p className="text-gray-500 text-sm">{user?.email}</p>
            </>
          )}
        </div>

        {/* Links */}
        <div className="p-3 border-b border-gray-200">
          <ul className="flex flex-col gap-2">
            <li>
              <NavLink className={activeLinks} to="/users/profile">
                <FaUser /> Personal Information
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLinks} to="/users/orders">
                <FaBox /> My Orders
              </NavLink>
            </li>
            <li>
              <NavLink className={activeLinks} to="/users/update-password">
                <RiLockPasswordLine /> Update Password
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserSideBar;
