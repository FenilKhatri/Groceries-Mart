import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoMdArrowBack } from "react-icons/io";
import { HiOutlineMail, HiOutlineUser, HiOutlineCalendar } from "react-icons/hi";
import { MdOutlineSubject } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { getContactDetails } from "../../api/adminApi";

const ContactDetails = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleContactDetails = async () => {
    try {
      setLoading(true);
      const res = await getContactDetails(id);
      setContact(res?.data || null);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to fetch contact details!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleContactDetails();
  }, [id]);

  return (
    <div className=" px-4 sm:px-6 lg:px-8 py-8">
      {/* Top */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Admin Panel
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Contact Details
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View full details of the selected contact message.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/contacts")}
          aria-label="Back"
          title="Back"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition cursor-pointer"
        >
          <IoMdArrowBack size={18} />
          Back
        </button>
      </div>

      {/* Content */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {loading ? (
          <p className="py-16 text-center text-xl font-semibold text-gray-500 animate-pulse">
            Loading contact details...
          </p>
        ) : !contact ? (
          <p className="py-16 text-center text-lg font-medium text-gray-500">
            Contact not found.
          </p>
        ) : (
          <>
            {/* Header */}
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-900">
                Message Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Review the user's submitted contact information below.
              </p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Name */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <HiOutlineUser size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Name
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {contact?.name || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <HiOutlineMail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Email
                    </p>
                    <p className="text-base font-semibold text-gray-900 break-all">
                      {contact?.email || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <MdOutlineSubject size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Subject
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {contact?.subject || "-"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <HiOutlineCalendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Submitted On
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      {contact?.createdAt
                        ? new Date(contact.createdAt).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="px-6 pb-6">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                    <FiMessageSquare size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Full Message
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      User Message
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700 whitespace-pre-wrap">
                  {contact?.message || "No message available."}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactDetails;