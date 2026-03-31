import React, { useEffect, useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineShieldCheck,
  HiOutlineUserCircle,
  HiOutlineCalendar,
} from "react-icons/hi";
import { ImCross } from "react-icons/im";
import { FiEdit2 } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "../../api/adminApi";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleData = async () => {
    try {
      setLoading(true);
      const adminData = await getProfile();
      setProfile(adminData.user);

      setName(adminData.user.name);
      setEmail(adminData.user.email);
      setPhone(adminData.user.phone);
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const payload = { name, email, phone };
      await updateProfile(payload);
      await handleData();
      setIsEditing(false);
      toast.success("Profile updated!");
    } catch (error) {
      toast.error(error?.message || "Failed to update!");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Admin Panel
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Admin Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your profile details and monitor account overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <div className="flex flex-col md:flex-row gap-3">
              <button
                className="inline-flex items-center gap-2 rounded-2xl border border-red-300 bg-white px-4 py-3 text-sm font-semibold text-red-700 shadow-sm transition-all hover:bg-red-50 hover:text-red-900 cursor-pointer"
                onClick={async () => {
                  setIsEditing(false);
                  await handleData();
                }}
              >
                <div className="flex items-center gap-3">
                  <ImCross className="text-base" />
                  <p>Cancel Changes</p>
                </div>
              </button>

              {isEditing && (
                <button
                  className="w-fit flex items-center gap-2 rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer"
                  disabled={updating}
                  onClick={handleUpdateProfile}
                >
                  {updating ? "Saving changes..." : "Save Changes"}
                </button>
              )}
            </div>
          ) : (
            <button
              className="inline-flex items-center gap-2 rounded-2xl border border-emerald-300 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:bg-emerald-50 hover:text-emerald-900 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <div className="flex items-center gap-3">
                <FiEdit2 className="text-base" />
                <p>Edit Profile</p>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      {loading ? (
        <p className="text-xl text-center font-bold animate-pulse">
          Loading Admin Profile...
        </p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Card */}
          <div className="xl:col-span-1">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-28 bg-emerald-500" />

              <div className="px-6 pb-6">
                <div className="-mt-14 flex flex-col items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-emerald-100 text-emerald-700 shadow-md">
                    <HiOutlineUserCircle className="text-6xl" />
                  </div>

                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold text-gray-900">
                      Admin {profile?.name || "-"}
                    </h2>
                    <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <RiAdminLine />
                      Admin
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <HiOutlineMail className="mt-0.5 text-lg text-emerald-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-gray-900 break-all">
                        {profile?.email || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <HiOutlinePhone className="mt-0.5 text-lg text-emerald-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Phone</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {profile?.phone || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <HiOutlineLocationMarker className="mt-0.5 text-lg text-emerald-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Location
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        Surat, Gujarat, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <HiOutlineCalendar className="mt-0.5 text-lg text-emerald-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Joined On
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {profile?.createdAt?.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="xl:col-span-2 space-y-8">
            {/* Admin Details */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 sm:px-6 py-4">
                <p className="text-sm font-semibold text-gray-900">
                  Profile Information
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Basic information and admin account details.
                </p>
              </div>

              {isEditing && (
                <p className="px-5 text-gray-900 font-semibold">
                  Note:{" "}
                  <span className="text-gray-500">
                    You can only change Name, Email, Phone.
                  </span>
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5 sm:p-6">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">Full Name</p>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mt-2 text-sm font-semibold text-gray-900 break-all outline-0"
                  />
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">Role</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    Admin
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Email Address
                  </p>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-2 text-sm font-semibold text-gray-900 break-all outline-0"
                  />
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Phone Number
                  </p>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full mt-2 text-sm font-semibold text-gray-900 break-all outline-0"
                  />
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">Admin ID</p>
                  <p className="mt-2 font-mono text-xs sm:text-sm font-semibold text-gray-900">
                    {profile?._id}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Access Level
                  </p>
                  <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    <HiOutlineShieldCheck className="text-base" />
                    Full Access Granted
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
