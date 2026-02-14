"use client";

import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";

const Timeline = () => {
  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-white text-4xl font-semibold tracking-wide">
          The official timeline will be released soon. Stay tuned for important dates and announcements.
        </h1>
      </div>

      <Footer />
    </div>
  );
};

export default Timeline;
