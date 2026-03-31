import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updatePassword } from "../../api/userApi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const UpdatePassword = () => {

  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [coolDown, setCoolDown] = useState(false);

  const navigate = useNavigate();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword)
      return toast.error("All fields are required!");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match!");

    const confirmed = confirm("Are you sure you want to update password!");
    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await updatePassword({ password });

      setPassword("");
      setConfirmPassword("");

      toast.success(res?.message || "Password updated successfully!");
      navigate("/users/profile");
    } catch (error) {
      toast.error(error?.message || "Failed to update!");
    } finally {
      setLoading(false);
    }
  };
  
  const handleReset = () => {
    if(coolDown) return;

    setPassword("");
    setConfirmPassword("");
    toast.success("Form reset successfully!");

    setCoolDown(true);
    setTimeout(() => setCoolDown(false), 2000);
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <p className="text-xl font-semibold text-gray-800">Update Password</p>
        <p className="text-sm text-gray-400">
          Change your account password securely.
        </p>
      </div>

      {/* Form UI */}
      <div className="p-6">
        <form className="space-y-6" onSubmit={handleUpdatePassword}>
          <p className="text-sm font-medium text-gray-500">
            Your password must start with uppercase and include lowercase,
            number, special character, and minimum 6 characters.
          </p>

          {/* New Password */}
          <div className="group flex flex-col gap-2 rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:shadow-sm">
            <label
              htmlFor="newPassword"
              className="text-sm font-medium text-gray-600"
            >
              New Password
            </label>
            <div className="w-full p-2 flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white group-hover:border-emerald-300 focus:border-emerald-400">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="group flex flex-col gap-2 rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:shadow-sm">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-600"
            >
              Confirm Password
            </label>
            <div className="w-full p-2 flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white group-hover:border-emerald-300 focus:border-emerald-400">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter confirm password"
                className="w-full text-gray-700 outline-none transition-all duration-300 placeholder:text-gray-400"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
            </div>
          </div>

          {/* Button */}
          <div className="pt-2 flex gap-3 justify-end">
            <button
              type="button"
              disabled={
                loading || (!password.trim() && !confirmPassword.trim())
              }
              onClick={handleReset}
              className={`rounded-2xl border border-emerald-600 px-6 py-3 text-sm font-semibold text-emerald-500 transition duration-300 
                        ${
                          loading ||
                          (!password.trim() && !confirmPassword.trim())
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-emerald-100 cursor-pointer"
                        }`}
            >
              {loading ? "Reseting..." : "Reset Form"}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition duration-300 ${loading ? "opacity-60" : "cursor-pointer"}`}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
