"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/workshop1.webp",
  "/images/workshop2.webp",
];

const Workshop = () => {
  const [hovered, setHovered] = useState(false);
  const navigateToWorkshop = () => {
    window.location.href = "/workshop";
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="w-[50vw] h-[75vh] mt-96 ml-8 flex flex-col items-center justify-center gap-4"
      onClick={navigateToWorkshop}
    >
      {/* Image Card */}
      <motion.div
        className="h-[70vh] w-[20vw] relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Animated Image Change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute w-full h-full"
          >
            <Image
              src={images[index]}
              alt="Workshop"
              fill
              className="object-cover transition-transform duration-500 ease-out rotating-border-effect"
            />
          </motion.div>
        </AnimatePresence>
        {hovered && (
          <div className="absolute inset-0 flex items-center justify-center  bg-black bg-opacity-55 text-white/50 text-3xl font-bold transition-all duration-300 ">Explore Workshops
          </div>
        )}
      </motion.div>

      {/* Text Section */}
      <div className="w-[20vw] mt-4 text-white font-bold text-center text-5xl">
        WORKSHOPS
      </div>
      <div className="w-[20vw] mt-4 text-white text-left">
        <p className="text-lg">
        Get ready to learn, innovate, and explore! Prodyogiki brings you a series of amazing workshops designed to enhance your technical skills and ignite your creativity.Whether you&apos;re a beginner or an expert, there&apos;s something for everyone. Don&apos;t miss the chance to level up your skills!
        </p>
      </div>
    </div>
  );
};

export default Workshop;