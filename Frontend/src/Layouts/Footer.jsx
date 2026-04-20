import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import WebLogo from "../assets/Logo.webp";
import { subscribe } from "../api/userApi";
import { contactInfo } from "../data/pages/contact.js";
import Description from "../components/ui/Description";
import { quickLinks, legalLinks } from "../data/footerLinks.js";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const FOOTER_LINKS =
    "font-semibold text-gray-500 hover:text-emerald-500 transition-all";

  const handleSubscribe = async () => {
    if (!email.trim()) {
      return toast.error("Please enter your email!");
    }

    try {
      setLoading(true);
      const res = await subscribe({ email });
      toast.success(res?.message || "Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error(error?.message || "Failed to subscribe!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="mt-5 space-y-10 bg-gray-100 px-5 py-10 md:p-10">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-6">
        <div className="col-span-1 space-y-5 lg:col-span-2">
          <div className="flex flex-col items-start justify-center gap-5">
            <div className="flex items-center justify-center gap-3">
              <img
                src={WebLogo}
                alt="Web Logo"
                className="w-16"
                loading="lazy"
                decoding="async"
                width="full"
                height="full"
              />
              <p className="text-lg font-bold text-emerald-500">
                Fresh<span className="text-orange-500">Mart</span>
              </p>
            </div>

            <Description className="leading-7 text-gray-500 text-justify">
              The leading multi-vendor grocery marketplace connecting you with
              fresh, organic produce and everyday essentials directly from local
              farms and trusted vendors.
            </Description>

            <div>
              <p className="font-bold text-gray-800">Get in touch</p>
              {contactInfo?.map((info, index) => {
                const Icon = info?.icon;

                return (
                  <a
                    className="mt-3 flex items-center gap-3 text-gray-600 transition-all hover:text-emerald-500"
                    href={info?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <Icon
                      size={20}
                      className={`${info?.theme} bg-transparent`}
                    />
                    {info?.description}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="flex flex-col items-start justify-start gap-5">
              <p className="font-bold text-gray-800">Quick Links</p>
              {quickLinks?.map((link, index) => (
                <Link className={FOOTER_LINKS} to={link?.path} key={index}>
                  {link?.description}
                </Link>
              ))}
            </div>

            <div className="flex flex-col items-start justify-start gap-5">
              <p className="font-bold text-gray-800">Legal</p>
              {legalLinks?.map((link, index) => (
                <Link className={FOOTER_LINKS} to={link?.path} key={index}>
                  {link?.description}
                </Link>
              ))}
            </div>

            <div className="max-w-sm w-full flex flex-col items-start justify-start gap-5">
              <p className="font-bold text-gray-800">Subscribe to Newsletter</p>
              <Description
                children="Get weekly updates on fresh deals and exclusive offers."
                className="text-gray-500"
              />

              <div className="w-full space-y-3">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="footer-email"
                  name="email"
                  value={email}
                  placeholder="Enter your email..."
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-white p-3 shadow-sm outline-none focus:ring-2 focus:ring-emerald-300"
                  autoComplete="true"
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={loading}
                  aria-label="Subscribe"
                  title="Subscribe"
                  className={`w-full rounded-md px-3 py-3 font-semibold text-white shadow-md transition-all ${
                    loading
                      ? "cursor-not-allowed bg-emerald-400 opacity-60"
                      : "cursor-pointer bg-emerald-500 hover:bg-emerald-600"
                  }`}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-8 text-center">
        <p className="font-semibold text-gray-500">
          &copy; 2026 FreshMart. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
