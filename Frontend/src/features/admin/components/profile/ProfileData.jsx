import PersonalInfo from "./PersonalInfo";

const ProfileData = ({
  profile,
  loading,
  isEditing,
  setIsEditing,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  updating,
  handleUpdateProfile,
  handleData,
}) => {
  return (
    <>
      {/* Content */}
      {loading ? (
        <p className="text-xl text-center font-bold animate-pulse">
          Loading Admin Profile...
        </p>
      ) : (
        <PersonalInfo
          profile={profile}
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
      )}
    </>
  );
};

export default ProfileData;
