import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const Register: React.FC = () => {
    const [hovered, setHovered] = useState(false);
  const navigateToProfile = () => {
    window.location.href = "/profile"; 
  };
  return (
    <div className="w-[60vw] h-[75vh] flex flex-row mt-28 ml-20 items-center justify-center gap-4"
    onClick={navigateToProfile}>
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
          src="/images/profile.webp"
          alt="Team"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-out rotating-border-effect"
        />

        {/* Overlay Text (Example of using hovered state) */}
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center  bg-black bg-opacity-55 text-white/70 text-3xl font-bold transition-all duration-300 ">Explore Your Profile
          </div>
        )}
      </motion.div>

  {/* Text Below Image */}

  <div className="w-[20vw]  ml-10 text-white">
    <div className="text-5xl  font-semibold mt-1  mb-16"> EXPLORE YOUR PROFILE</div>
    <p className='text-lg'>
    Unlock your journey with us! Dive into your achievements, track your progress, and stay updated with your latest activities. Whether it&apos;s past accomplishments or new milestones, your profile is your gateway to everything you&apos;ve been a part of. Stay connected and keep growing!
  </p>
  </div>
</div>
  );
};

export default Register;
