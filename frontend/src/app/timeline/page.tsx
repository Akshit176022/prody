"use client";

import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";

const Timeline = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-white text-5xl font-bold tracking-wide">
          Coming Soon
        </h1>
      </div>

      <Footer />
    </div>
  );
};

export default Timeline;
