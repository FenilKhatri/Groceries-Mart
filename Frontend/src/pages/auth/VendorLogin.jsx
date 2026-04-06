import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { vendorLogin } from "../../api/vendorApi";
import { getMe } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import WebLogo from "../../assets/Logo.webp";
import VendorBackground from "../../components/auth/VendorAuthBackground";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import Button from "../../components/ui/Button";

const VendorLogin = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const loginRes = await vendorLogin({ email, password });

      const vendorId = loginRes?.vendor?._id;
      const token = loginRes?.token;

      if (!token) {
        toast.error("Login failed!");
        return;
      }

      login({
        role: "vendor",
        token,
      });

      toast.success("Logged In Successfully!");

      navigate(`/vendors/${vendorId}/profile`, { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Login failed!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full grid lg:grid-cols-2">
      <VendorBackground />

      <div className="flex flex-col justify-center bg-white px-6 sm:px-10 lg:px-16 w-full md:max-w-3xl md:mx-auto">
        <div className="flex justify-center md:justify-end">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <FaArrowLeftLong size={14} />
            Back to Marketplace
          </button>
        </div>

        <div className="mt-10 flex items-center gap-3 md:justify-center lg:justify-start">
          <img
            src={WebLogo}
            alt="logo"
            loading="lazy"
            decoding="async"
            className="h-10"
          />
          <div className="flex items-center gap-3">
            <p className="text-xl font-bold text-orange-600">Green Leaf</p>
            <span className="bg-orange-100 text-orange-500 text-xs px-2 py-1 rounded-md font-bold">
              Vendor
            </span>
          </div>
        </div>

        <div className="mt-8 md:text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900">Vendor Portal</h1>
          <p className="text-gray-500 mt-2">
            Sign in to access your account and continue your journey.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6 w-full max-w-xl md:max-w-2xl"
        >
          <div>
            <label className="font-semibold text-sm">Email Address</label>
            <div className="mt-2 flex items-center gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100">
              <MdOutlineMail size={20} />
              <input
                type="email"
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full outline-none"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-sm">Password</label>
            <div className="mt-2 flex items-center justify-between gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-100">
              <div className="flex items-center gap-3 w-full">
                <RiLockPasswordLine size={20} />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full outline-none"
                  autoComplete="current-password"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="text-gray-500 hover:text-orange-600 transition"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <BiSolidShow size={20} />
                ) : (
                  <BiSolidHide size={20} />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            children={loading ? "Signing In..." : "Sign In →"}
            variant="primary"
            className="py-4 min-w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          />

          <p className="text-center text-gray-500 text-sm">
            Don’t have an account yet?{" "}
            <Link
              to="/vendor/register"
              className="text-orange-600 font-semibold border-b-2 border-b-orange-600 cursor-pointer"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default VendorLogin;
