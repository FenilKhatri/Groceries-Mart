import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { SiGmail } from "react-icons/si";

export const contactInfo = [
    {
        icon: IoLogoWhatsapp,
        theme: "text-emerald-500 bg-emerald-100",
        title: "Whatsapp Contact",
        link: "https://wa.me/919313407400",
        description: "+91 9313407400",
    },
    {
        icon: FaPhoneAlt,
        theme: "text-blue-500 bg-blue-100",
        title: "Phone Support",
        link: "tel:+919313407400",
        description: "+91 9313407400",
    },
    {
        icon: SiGmail,
        theme: "text-red-500 bg-red-100",
        title: "Email Us",
        link: "mailto:fenilkhatri931@gmail.com",
        description: "fenilkhatri931@gmail.com",
    },
]