import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePassword } from "../../api/vendorApi";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const confirmed = confirm("Are you sure you want to update password?");
    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await updatePassword(id, { password });

      setPassword("");
      setConfirmPassword("");

      toast.success(res?.message || "Password updated successfully!");
      navigate(`/vendors/${id}/profile`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update!");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPassword("");
    setConfirmPassword("");
    toast.success("Form reset successfully!");
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Vendor Panel
            </p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Vendor Update Password
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              You can update your password.
            </p>
          </div>
        </div>

        {/* Password Update Section */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 px-5 sm:px-6 py-4">
            <p className="text-sm font-semibold text-gray-900">
              Update Password
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Change your account password securely.
            </p>
          </div>

          {/* Form */}
          <form action="#" onSubmit={handleUpdatePassword}>
            <div className="w-full flex flex-col md:flex-row items-start justify-between gap-5 p-5 sm:p-6">
              {/* New Password */}
              <div className="w-full group rounded-2xl p-4">
                <p className="text-xs font-medium text-gray-500">
                  New Password
                </p>

                <div className="mt-2 rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-md focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:font-medium placeholder:text-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }
                      className="grid h-10 w-10 shrink-0 place-items-center text-orange-600 transition duration-300 cursor-pointer"
                    >
                      {showPassword ? (
                        <IoMdEye className="text-xl" />
                      ) : (
                        <IoMdEyeOff className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="w-full rounded-2xl p-4">
                <p className="text-xs font-medium text-gray-500">
                  Confirm Password
                </p>
                <div className="mt-2 rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:border-orange-300 hover:shadow-md focus-within:border-orange-500 focus-within:ring-4 focus-within:ring-orange-100">
                  <div className="flex items-center gap-3 rounded-xl px-4 py-3">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-transparent text-sm font-semibold text-gray-900 outline-none placeholder:font-medium placeholder:text-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      aria-label={
                        showConfirmPassword ? "Hide Password" : "Show Confirm Password"
                      }
                      className="grid h-10 w-10 shrink-0 place-items-center text-orange-600 transition duration-300 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <IoMdEye className="text-xl" />
                      ) : (
                        <IoMdEyeOff className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Rules */}
            <div className="px-6 pb-4">
              <p className="text-xs text-gray-500">
                Password must start with uppercase and include lowercase,
                number, special character, and minimum 6 characters.
              </p>
            </div>

            {/* Button */}
            <div className="px-5 sm:px-6 py-4 flex gap-3 justify-end">
              <button
                type="button"
                disabled={
                  loading || (!password?.trim() && !confirmPassword?.trim())
                }
                onClick={handleReset}
                className={`rounded-2xl border border-orange-600 px-6 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-100 transition duration-300 ${loading || (!password?.trim() && !confirmPassword?.trim()) ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {loading ? "Reseting..." : "Reset Form"}
              </button>
              <button
                type="submit"
                disabled={
                  loading || (!password?.trim() && !confirmPassword?.trim())
                }
                className={`rounded-2xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-700 transition duration-300 ${loading || (!password?.trim() && !confirmPassword?.trim()) ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
