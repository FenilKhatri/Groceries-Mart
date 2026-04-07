import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import WebLogo from "../../assets/Logo.webp";
import Background from "../../components/auth/UserAuthBackground";

import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdDialpad } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

import { userRegister } from "../../api/authUserApi";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerLoading) return;

    if (password !== confirmPassword) {
      return toast.warning("Password not matched!");
    }

    try {
      setRegisterLoading(true);

      // axios register payload
      const data = await userRegister({
        name,
        email,
        phone,
        password,
        role: "user",
      });

      toast.success(data?.message || "Registered!");

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Bad Request",
      );
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen grid lg:grid-cols-2">
      <Background />

      {/* Register Part*/}
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
            Sign up to manage your store, track orders, and view sales
            analytics.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleRegister}
          className="mt-10 space-y-6 w-full max-w-xl md:max-w-2xl"
        >
          {/* Name */}
          <div>
            <label className="font-semibold text-sm">Name</label>
            <div className="mt-2 flex items-center gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <FaRegUser size={20} />
              <input
                type="text"
                value={name}
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="font-semibold text-sm">Email Address</label>
            <div className="mt-2 flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100 w-full">
                <MdOutlineMail size={20} />
                <input
                  type="email"
                  value={email}
                  name="email"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email..."
                  className="w-full outline-none"
                />
              </div>
            </div>
            <p className="font-semibold text-gray-400">
              Note:{" "}
              <span className="font-normal text-gray-300">
                Please check your email before registeration!
              </span>
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="font-semibold text-sm">Contact Number</label>
            <div className="mt-2 flex items-center gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <MdDialpad size={20} />
              <input
                type="tel"
                value={phone}
                name="phone"
                id="phone"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your number..."
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold text-sm">Password</label>
            <div className="mt-2 flex items-center justify-between gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
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

              <button
                type="button"
                aria-label={showPass ? "Show Pass" : "Hide Pass"}
                title={showPass ? "Show Pass" : "Hide Pass"}
                onClick={() => setShowPass((p) => !p)}
                className="text-gray-500 hover:text-emerald-600 transition"
              >
                {showPass ? (
                  <BiSolidShow size={20} />
                ) : (
                  <BiSolidHide size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="font-semibold text-sm">Confirm Password</label>
            <div className="mt-2 flex items-center justify-between gap-3 border border-gray-400 rounded-xl px-4 py-3 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <div className="flex items-center gap-3 w-full">
                <RiLockPasswordLine size={20} />
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowConfirmPass((p) => !p)}
                aria-label={showConfirmPass ? "Show Pass" : "Hide Pass"}
                title={showConfirmPass ? "Show Pass" : "Hide Pass"}
                className="text-gray-500 hover:text-emerald-600 transition"
              >
                {showConfirmPass ? (
                  <BiSolidShow size={20} />
                ) : (
                  <BiSolidHide size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            aria-label="Sign Up"
            title="Sign Up"
            disabled={registerLoading}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-semibold hover:bg-emerald-700 transition duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {registerLoading ? "Signing Up..." : "Sign Up →"}
          </button>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-semibold border-b-2 border-b-emerald-600 cursor-pointer"
            >
              Login now
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
