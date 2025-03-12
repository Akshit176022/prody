"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/images/WhatsApp Image 2025-03-04 at 23.33.54 (1).jpeg",
  "/images/WhatsApp Image 2025-03-04 at 23.33.56.jpeg",
];

const Workshop = () => {
  const navigateToWorkshop = () => {
    window.location.href = "/workshop";
  };

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

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
              className="object-cover transition-transform duration-500 ease-out"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Text Section */}
      <div className="w-[20vw] mt-4 text-white text-center text-4xl">
        Workshops
      </div>
      <div className="w-[20vw] mt-4 text-white text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique error
        facere impedit deserunt porro maxime. Assumenda veritati porro maxime.
        Assumenda veritati.
      </div>
    </div>
  );
};

export default Workshop;