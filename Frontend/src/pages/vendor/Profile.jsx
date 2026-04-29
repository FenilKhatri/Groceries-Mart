import React, { useEffect, useState } from "react";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineShieldCheck,
  HiOutlineUserCircle,
  HiOutlineCalendar,
} from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { toast } from "react-toastify";
import {
  deleteProfile,
  updateProfile,
  vendorProfile,
} from "../../features/vendor/api";
import { MdVerifiedUser } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { id } = useParams();

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleData = async () => {
    try {
      setLoading(true);
      const res = await vendorProfile(id);

      const vendor = res?.data?.vendor || {};
      setProfile(vendor);
      setName(vendor?.name || "");
      setEmail(vendor?.email || "");
      setPhone(vendor?.phone || "");
    } catch (error) {
      toast.error(error?.message || "Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setName(profile?.name || "");
      setEmail(profile?.email || "");
      setPhone(profile?.phone || "");
      setIsEditing(false);
      return;
    }

    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setUpdating(true);

      await updateProfile({ name, email, phone });

      toast.success("Profile updated successfully!");
      await handleData();
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update!");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete account?");
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteProfile(id);

      logout();
      navigate("/", { replace: true });
      toast.success("Account deleted successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete!");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Vendor Panel
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Vendor Profile
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your profile details and monitor account overview.
          </p>
        </div>
        <button
          type="button"
          disabled={deleting}
          aria-label="Delete"
          title="Delete"
          onClick={handleDelete}
          className="rounded-2xl border border-red-600 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-100 disabled:opacity-60 cursor-pointer transition duration-300"
        >
          {deleting ? "Deleting Account..." : "Delete Account"}
        </button>
      </div>

      {loading ? (
        <p className="text-xl text-center font-bold animate-pulse">
          Loading Vendor Profile...
        </p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="h-28 bg-orange-500" />

              <div className="px-6 pb-6">
                <div className="-mt-14 flex flex-col items-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-orange-100 text-orange-700 shadow-md">
                    <HiOutlineUserCircle className="text-6xl" />
                  </div>

                  <div className="mt-4 text-center">
                    <h2 className="text-xl font-bold text-gray-900">
                      Vendor {profile?.name}
                    </h2>
                    <p className="mt-1 inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                      <RiAdminLine />
                      Vendor
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <HiOutlineMail className="mt-0.5 text-lg text-orange-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-gray-900 break-all">
                        {profile?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <HiOutlinePhone className="mt-0.5 text-lg text-orange-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">Phone</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {profile?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <HiOutlineCalendar className="mt-0.5 text-lg text-orange-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Joined On
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {profile?.createdAt?.slice(0, 10)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
                    <MdVerifiedUser className="mt-0.5 text-lg text-orange-600" />
                    <div>
                      <p className="text-xs font-medium text-gray-500">
                        Approved On
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {profile?.status === "pending" ? (
                          "Not Approved yet"
                        ) : (
                          <>{profile?.approvedAt?.slice(0, 10)}</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 space-y-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-5 sm:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Profile Information
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Basic information and vendor account details.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Edit"
                    title="Edit"
                    className={`inline-flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 text-sm font-semibold shadow-sm transition-all cursor-pointer
                ${
                  isEditing
                    ? "hover:bg-red-50 hover:text-red-900 border-red-300 text-red-700 "
                    : "hover:bg-orange-50 hover:text-orange-900 border-orange-300 text-orange-700 "
                }
              `}
                    onClick={handleEditToggle}
                  >
                    {isEditing ? "Cancel Edit" : "Edit Profile"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={updating}
                      aria-label="Save"
                      title="Save"
                      className="rounded-2xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60 cursor-pointer transition duration-300"
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                  )}
                </div>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none disabled:cursor-not-allowed"
                  />
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">Role</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    Vendor
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Email Address
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none disabled:cursor-not-allowed"
                  />
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">
                    Phone Number
                  </p>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    className="mt-2 w-full bg-transparent text-sm font-semibold text-gray-900 outline-none disabled:cursor-not-allowed"
                  />
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs font-medium text-gray-500">Vendor ID</p>
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
