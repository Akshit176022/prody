"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const Members = () => {
  const [hovered, setHovered] = useState(false);

  const navigateToMembers = () => {
    window.location.href = "/events";
  };

  return (
    <div
      className="w-[60vw] h-[75vh] flex flex-row mt-20 ml-20 items-center justify-center gap-4"
      onClick={navigateToMembers}
    >
      {/* Image Card */}
      <motion.div
        className="h-[65vh] w-[23vw] relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image */}
        <Image
          src="/images/events.webp"
          alt="Team"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-out"
        />

        {/* Overlay Text (Example of using hovered state) */}
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
          </div>
        )}
      </motion.div>

      {/* Text Section */}
      <div className="w-[20vw] ml-10 text-white">
        <div className="text-7xl font-semibold mt-1 mb-8">EXPLORE EVENTS</div>
        <p className='text-lg'>
        Join us for an exciting series of events! Participate, learn, and showcase your skills.Participate in events ranging in all domains and engineering branches. Register now and be a
          part of something amazing. 
        </p>
      </div>
    </div>
  );
};

export default Members;