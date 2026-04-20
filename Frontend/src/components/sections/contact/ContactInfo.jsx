import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io';
import { SiGmail } from 'react-icons/si';
import { contactInfo } from '../../../data/pages/contact';

const ContactInfo = () => {
  return (
    <>
      <div className="flex flex-col gap-5">
        {contactInfo?.map((info, index) => {
            const Icon = info?.icon;

            return (
              <div
                className="w-full bg-white border border-gray-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 p-5 rounded-2xl"
                key={index}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${info?.theme}`}
                >
                  <Icon size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-gray-900">
                    {info?.title}
                  </p>
                  <a
                    className="text-gray-500 font-medium hover:text-emerald-600 transition-all break-all"
                    href={info?.link}
                    target='_blank'
                  >
                    {info?.description}
                  </a>
                </div>
              </div>
            );
        })}
      </div>
    </>
  );
}

export default ContactInfo