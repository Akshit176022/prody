"use client";
import { motion } from "framer-motion";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";

const Timeline = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-4xl font-bold text-white text-center"
        >
      Workshops will be announced soon — stay tuned for more updates and surprises! 🎉
        </motion.h1>
      </div>

      <Footer />
    </div>
  );
};

export default Timeline;
