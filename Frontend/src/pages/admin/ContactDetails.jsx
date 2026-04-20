import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { getContactDetails } from "../../api/adminApi";

import { IoMdArrowBack } from "react-icons/io";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
} from "react-icons/hi";
import { MdOutlineSubject } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";

const ContactDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //  CONTACT QUERY 
  const {
    data: contact = null,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["contact", id],
    queryFn: () => getContactDetails(id),
    select: (res) => res?.data || null,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to fetch contact details!",
      );
    },
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* TOP */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Admin Panel
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-gray-900">
            Contact Details
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            View full details of the selected contact message.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/contacts")}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition"
        >
          <IoMdArrowBack size={18} />
          Back
        </button>
      </div>

      {/* CARD */}
      <div className="mt-8 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {/* LOADING */}
        {isLoading ? (
          <p className="py-16 text-center text-xl font-semibold text-gray-500 animate-pulse">
            Loading contact details...
          </p>
        ) : !contact ? (
          <p className="py-16 text-center text-lg font-medium text-gray-500">
            Contact not found.
          </p>
        ) : (
          <>
            {/* HEADER */}
            <div className="border-b border-gray-100 bg-gray-50 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-900">
                Message Overview
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Review the user's submitted contact information below.
              </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* NAME */}
              <InfoCard
                icon={<HiOutlineUser />}
                label="Name"
                value={contact.name}
                color="emerald"
              />

              {/* EMAIL */}
              <InfoCard
                icon={<HiOutlineMail />}
                label="Email"
                value={contact.email}
                color="blue"
              />

              {/* SUBJECT */}
              <InfoCard
                icon={<MdOutlineSubject />}
                label="Subject"
                value={contact.subject}
                color="violet"
              />

              {/* DATE */}
              <InfoCard
                icon={<HiOutlineCalendar />}
                label="Submitted On"
                value={
                  contact.createdAt
                    ? new Date(contact.createdAt).toLocaleString()
                    : "-"
                }
                color="orange"
              />
            </div>

            {/* MESSAGE */}
            <div className="px-6 pb-6">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-pink-600">
                    <FiMessageSquare />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Full Message
                    </p>
                    <p className="text-base font-semibold text-gray-900">
                      User Message
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm leading-7 text-gray-700 whitespace-pre-wrap">
                  {contact.message || "No message available."}
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

/*  SMALL REUSABLE CARD  */
const InfoCard = ({ icon, label, value, color = "gray" }) => {
  const colors = {
    emerald: "bg-emerald-100 text-emerald-600",
    blue: "bg-blue-100 text-blue-600",
    violet: "bg-violet-100 text-violet-600",
    orange: "bg-orange-100 text-orange-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full ${colors[color]}`}
        >
          {icon}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {label}
          </p>
          <p className="text-base font-semibold text-gray-900 break-all">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};
