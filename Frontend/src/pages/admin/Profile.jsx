import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProfile, updateProfile } from "../../api/adminApi";
import ProfileData from "../../components/sections/admin/profile/ProfileData";
import H3 from "../../components/ui/H3";
import Description from "../../components/ui/Description";

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
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-600">
            Admin Panel
          </p>

          <H3>Admin Profile</H3>

          <Description className="text-gray-500">
            Manage your profile details and monitor account overview.
          </Description>
        </div>

        <ProfileData
          profile={profile}
          loading={loading}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          updating={updating}
          handleUpdateProfile={handleUpdateProfile}
          handleData={handleData}
        />
      </div>
    </>
  );
};

export default Profile;
