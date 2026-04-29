import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getProfile, updateProfile } from "../../features/admin/api";
import H3 from "../../shared/components/ui/H3";
import Description from "../../shared/components/ui/Description";
import ProfileData from "../../features/admin/components/profile/ProfileData";

const Profile = () => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  //  PROFILE QUERY
  const { data = {}, isLoading } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: getProfile,
    select: (res) => res?.data?.user || {},
    staleTime: 5 * 60 * 1000,
  });

  //  LOCAL EDIT STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // sync form when data loads
  useEffect(() => {
    if (data) {
      localStorage.setItem("admin", JSON.stringify(data));
      setForm({
        name: data?.name || "Admin",
        email: data?.email || "",
        phone: data?.phone || "",
      });
    }
  }, [data]);

  //  UPDATE PROFILE
  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);

      await updateProfile(form);

      toast.success("Profile updated!");

      queryClient.setQueryData(["adminProfile"], (old) => ({
        ...old,
        ...form,
      }));

      setIsEditing(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update!");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
          Admin Panel
        </p>

        <H3>Admin Profile</H3>

        <Description className="text-gray-500">
          Manage your profile details and account overview.
        </Description>
      </div>

      {/* PROFILE UI */}
      <ProfileData
        profile={data}
        loading={isLoading}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        name={form.name}
        setName={(v) => setForm((p) => ({ ...p, name: v }))}
        email={form.email}
        setEmail={(v) => setForm((p) => ({ ...p, email: v }))}
        phone={form.phone}
        setPhone={(v) => setForm((p) => ({ ...p, phone: v }))}
        updating={updating}
        handleUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;
