import React from "react";

// ICONS IMPORT
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitterSquare,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

// SOCIAL MEDIA LINKS MAP
const socialLinks = [
  {
    icon: <FaFacebookSquare size={20} />,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61558414566241",
  },
  {
    icon: <FaInstagramSquare size={20} />,
    label: "Instagram",
    href: "/",
  },
  {
    icon: <FaTwitterSquare size={20} />,
    label: "Twitter",
    href: "/",
  },
  {
    icon: <FaLinkedinIn size={20} />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jeferson-binay-an-rmee-assoc-asean-engr-99271532/",
  },
  {
    icon: <MdOutlineEmail size={22} />,
    label: "Email",
    href: "/",
  },
];

const footerLinks = [
  {
    title: "Contact & About",
    links: ["Contact", "About us", "Reviews"],
  },
  {
    title: "Terms and Conditions",
    links: [
      "Term & Condition",
      "Service Agreement",
      "Cookie Policy",
      "Privacy Policy",
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col">
      <div className="w-full bg-[#071C34] mx-auto py-8 px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-400 border-b-2 border-gray-600">
        <div>
          <h1 className="w-full text-4xl font-bold text-white">Ztellar</h1>
          <p className="py-4">Where Collaborative Learning Meets the Future!</p>
        </div>

        <div>
          <h6 className="font-medium text-white underline mb-4">
            Social Media
          </h6>
          <div className="flex flex-col space-y-3">
            {socialLinks.map(({ icon, label, href }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center text-gray-400 hover:text-white hover:scale-105 cursor-pointer duration-300"
              >
                {icon}
                <span className="ml-2">{label}</span>
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((section, index) => (
          <div key={index}>
            <h6 className="font-medium text-white underline mb-4">
              {section.title}
            </h6>
            <ul>
              {section.links.map((link, idx) => (
                <li
                  key={idx}
                  className="py-2 text-sm cursor-pointer hover:text-white hover:duration-300 hover:scale-105"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="w-full bg-[#071C34] text-gray-300 px-3 py-2 flex flex-col md:flex-row justify-between items-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ztellar.tech
        </span>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Copyright © {new Date().getFullYear()} Ztellar. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
