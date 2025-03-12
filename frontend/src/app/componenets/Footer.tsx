"use client";

import Image from "next/image";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center px-10 py-3 text-white shadow">
      
      {/* Main Logo */}
      <div>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={120}
          height={50}
          className="cursor-pointer w-[5vw]"
        />
      </div>

      
      <div className="mt-7 font-medium text-3xl">PRODYOGIKI 2025</div>

      
      <div className="line bg-white w-[85vw] h-[1px] rounded-3xl mt-5"></div>

      
      <div className="flex justify-center w-[100vw] items-center py-3  ">
        
        
        <div className="flex items-center justify-center ">
          <Image
            src="/iste.webp"
            alt="ISTE Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
          <div className="text-2xl -mt-5">ISTE NITH</div>
        </div>

        <div className="flex items-center pl-40 justify-center mb-4 space-x-6">
          <a href="" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={40} className="hover:text-gray-600 transition-colors duration-200" />
          </a>

          <a href="https://www.linkedin.com/company/iste-nith/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={40} className="hover:text-gray-600 transition-colors duration-200" />
          </a>

          <a href="https://github.com/istenith" target="_blank" rel="noopener noreferrer">
            <FaGithub size={40} className="hover:text-gray-600 transition-colors duration-200" />
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
