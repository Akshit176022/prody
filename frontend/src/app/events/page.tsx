"use client";

import Navbar from "../componenets/Navbar";

const page = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-white text-5xl font-bold tracking-wide">
          Coming Soon
        </h1>
      </div>
    </div>
  );
};

export default page;
