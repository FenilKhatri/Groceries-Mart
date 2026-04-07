import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

import WebLogo from "../../assets/Logo.webp";
import Background from "../../components/auth/UserAuthBackground";

import { userLogin } from "../../api/authUserApi";
import { useAuth } from "../../context/AuthContext";
import { getMe } from "../../api/authApi";
import Button from "../../components/ui/Button";

const Login = () => {
  // same functionality states
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      await userLogin({ email, password });
      const meJson = await getMe();

      const account = meJson?.data?.account || meJson?.account || null;
      const accountType =
        meJson?.data?.accountType || meJson?.accountType || null;

      if (!account || !accountType) {
        toast.error("Login failed!");
        return;
      }

      login({
        role: accountType,
        user: accountType === "user" ? account : null,
        vendor: accountType === "vendor" ? account : null,
        admin: accountType === "admin" ? account : null,
      });

      toast.success("Logged In Successfully!");

      if (accountType === "admin") {
        navigate("/admin/profile", { replace: true });
      } else if (accountType === "vendor") {
        const vendorId = account?._id || account?.id;
        navigate(`/vendors/${vendorId}/profile`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Login failed!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen grid lg:grid-cols-2">
      <Background />

      {/* Login Part */}
      <div className="flex flex-col justify-center bg-white px-6 sm:px-10 lg:px-16 w-full md:max-w-3xl md:mx-auto">
        {/* Back */}
        <div className="flex justify-center md:justify-end">
          <button
            onClick={() => navigate("/")}
            aria-label="Back"
            title="Back"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            <FaArrowLeftLong size={14} />
            Back to Marketplace
          </button>
        </div>

        {/* Logo + Title */}
        <div className="mt-10 flex items-center gap-3 md:justify-center lg:justify-start">
          <img
            src={WebLogo}
            alt="logo"
            loading="lazy"
            decoding="async"
            className="h-10"
            width="full"
            height="full"
          />

          <div className="flex items-center gap-3">
            <p className="text-xl font-bold text-emerald-600">Green Leaf</p>

            <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-md font-semibold">
              USER
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className="mt-8 md:text-center lg:text-left">
          <h1 className="text-4xl font-bold text-gray-900">User Portal</h1>

          <p className="text-gray-500 mt-2">
            Sign in to access your account and continue your journey.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6 w-full max-w-xl md:max-w-2xl"
        >
          {/* Email */}
          <div>
            <label className="font-semibold text-sm">Email Address</label>

            <div className="mt-2 flex items-center gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <MdOutlineMail size={20} />
              <input
                type="email"
                value={email}
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-sm">Password</label>

            <div className="mt-2 flex items-center justify-between gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              {/* Left icon + input */}
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
                />
              </div>

              {/* Toggle button */}
              <button
                type="button"
                onClick={() => setShowPass((prev) => !prev)}
                className="text-gray-500 hover:text-emerald-600 transition"
                aria-label={showPass ? "Hide password" : "Show password"}
                title={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? (
                  <BiSolidShow size={20} />
                ) : (
                  <BiSolidHide size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            children={loading ? "Signing In..." : "Sign In →"}
            variant="secondary"
            aria-label="Sign In"
            title="Sign In"
            className="py-3 min-w-full cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          />

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm">
            Don’t have an account yet?{" "}
            <Link
              to="/register"
              className="text-emerald-600 font-semibold border-b-2 border-b-emerald-600 cursor-pointer"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
