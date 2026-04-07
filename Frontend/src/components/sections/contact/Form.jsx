import { toast } from "react-toastify";
import { contact } from "../../../api/userApi";
import { useState } from "react";

const Form = () => {
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
  };

  return (
    <>
      <form
        className="bg-white border border-gray-200 p-6 md:p-8 space-y-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
        onSubmit={handleContact}
      >
        <div className="space-y-2">
          <p className="font-bold text-2xl text-gray-900">Send us a message</p>
          <p className="text-sm text-gray-500 font-medium">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible.
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
                ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer bg-emerald-500 hover:bg-emerald-600"}`}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </>
  );
};

export default Form;
