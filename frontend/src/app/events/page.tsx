"use client";

import Navbar from "../componenets/Navbar";

const page = () => {
  return (
    <div className=" ">
      <Navbar />
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-white text-4xl font-semibold tracking-wide">
          Events  will be announced soon — stay tuned for more updates and surprises! 🎉
        </h1>
      </div>
    </div>
  );
};

export default page;
