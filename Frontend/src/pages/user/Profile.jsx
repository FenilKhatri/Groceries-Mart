import { useEffect, useState } from "react";
import {
  deleteProfile,
  updateProfile,
  userProfile,
} from "../../features/user/api";
import { toast } from "react-toastify";
import UserProfileSkeleton from "../..//shared/components/feedback/skeleton/UserProfileSkeleton";
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (id) handleData();
  }, [id]);

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
      toast.error("Failed to fetch!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (isEditing) {
      // Cancel edit → reset values
      setName(user?.name || "");
      setEmail(user?.email || "");
      setPhone(user?.phone || "");
      setIsEditing(false);
      return;
    }
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setUpdating(true);

      await updateProfile({ name, email, phone }, id);

      toast.success("Profile updated!");
      await handleData();
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update!");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?",
    );
    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteProfile();

      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      toast.error(error?.message || "Failed to delete!");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (id) handleData();
  }, [id]);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 p-6 border-b border-gray-200">
        <div>
          <p className="text-xl font-semibold text-gray-800">
            Personal Information
          </p>
          <p className="text-sm text-gray-400">Update your details here.</p>
        </div>

        <button
          className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition duration-300 cursor-pointer"
          onClick={handleDelete}
          disabled={deleting}
          aria-label="Delete"
          title="Delete"
        >
          {deleting ? "Deleting profile..." : "Delete Account"}
        </button>
      </div>

      {/* Form */}
      <div className="p-6">
        {loading ? (
          <UserProfileSkeleton />
        ) : (
          <form className="space-y-6">
            {isEditing && (
              <p className="text-gray-900 font-semibold">
                Note:{" "}
                <span className="text-gray-500">
                  You can only change Name, Email, Phone.
                </span>
              </p>
            )}

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                disabled={!isEditing}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2 text-gray-700 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                disabled={!isEditing}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-600">Phone</label>
              <input
                type="tel"
                disabled={!isEditing}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex flex-col md:flex-row gap-3">
              <button
                type="button"
                aria-label="Edit"
                title="Edit"
                className={`px-5 py-2.5 rounded-lg font-semibold transition duration-300 cursor-pointer
                  ${
                    isEditing
                      ? "border border-red-500 text-red-500"
                      : "bg-emerald-500 text-white"
                  }
                `}
                onClick={handleEdit}
                disabled={isUpdating}
              >
                {isEditing ? "Cancel Changes" : "Edit Profile"}
              </button>

              {isEditing && (
                <button
                  type="button"
                  aria-label="Save"
                  title="Save"
                  className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition duration-300 cursor-pointer"
                  onClick={handleSave}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
