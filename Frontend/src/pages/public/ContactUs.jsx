import { FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { toast } from "react-toastify";
import { contact } from "../../api/userApi";
import { useState } from "react";

const ContactUs = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      const res = await contact({ name, email, subject, message });
      toast.success(res?.message || "Message sent successfully!");

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast.error(error?.message || "Failed to send!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-gray-50 py-10 md:py-16">
      <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-10 space-y-10">
        {/* Heading */}
        <div className="w-full space-y-4 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base font-medium">
            Have a question about your order, want to become a vendor, or just
            want to say hi? We&apos;re always here to help you out.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Contact Info */}
          <div className="flex flex-col gap-5">
            {/* WhatsApp */}
            <div className="w-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 p-5 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <IoLogoWhatsapp size={26} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-gray-900">
                  WhatsApp Contact
                </p>
                <a
                  className="text-gray-500 font-medium hover:text-emerald-600 transition-all"
                  href="https://wa.me/919313407400"
                  target="_blank"
                  rel="noreferrer"
                >
                  +91 9313407400
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="w-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 p-5 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <FaPhoneAlt size={22} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-gray-900">Phone Support</p>
                <a
                  className="text-gray-500 font-medium hover:text-emerald-600 transition-all"
                  href="tel:+919313407400"
                >
                  +91 9313407400
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="w-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 p-5 rounded-2xl">
              <div className="w-14 h-14 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0">
                <SiGmail size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-gray-900">Email Us</p>
                <a
                  className="text-gray-500 font-medium hover:text-emerald-600 transition-all break-all"
                  href="mailto:fenilkhatri931@gmail.com"
                >
                  fenilkhatri931@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white border border-gray-200 p-6 md:p-8 space-y-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300" onSubmit={handleContact}>
            <div className="space-y-2">
              <p className="font-bold text-2xl text-gray-900">
                Send us a message
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              {/* Name */}
              <label htmlFor="name" className="font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="email" className="font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email..."
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="subject" className="font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                placeholder="Enter your subject..."
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="message" className="font-medium text-gray-700">
                Message
              </label>
              <textarea
                placeholder="Enter your message..."
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-gray-50 border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg 
                ${loading ? "opacity-60" : "cursor-pointer bg-emerald-500 hover:bg-emerald-600"}`}
            >
              { loading ? "Sending..." : "Send Message" }
            </button>
          </form>
        </div>

        {/* Map integration */}
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <h3 className="text-3xl font-bold text-gray-900">
              Find Us On The Map
            </h3>
            <p className="text-gray-500 max-w-xl mx-auto">
              Visit our office or pickup location. We're located in Surat and
              always happy to meet our customers.
            </p>
          </div>

          <div className="w-full bg-white border border-gray-200 shadow-md rounded-3xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1788429504836!2d72.83192997511073!3d21.22475558047407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04ee9ed6dd4d7%3A0x83a13a1e8bda8c9a!2sSanskar%20Villa%20Apartment!5e0!3m2!1sen!2sin!4v1773394775195!5m2!1sen!2sin"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="w-full h-50 md:h-150 rounded-2xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
