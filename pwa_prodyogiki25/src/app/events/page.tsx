"use client";

import Burger from "../home/components/hamburger";

export default function Event() {
  return (
    <div className="bg-cover bg-center font-sans min-h-screen">
      <Burger />
      <div className="text-center pt-24 text-white font-sans text-[28px]">
        OUR EVENTS
      </div>

      <div className="flex items-center justify-center mt-20">
        <div className="text-white text-2xl mx-8 font-thin">
          Events will be announced soon — stay tuned for more updates and surprises! 🎉
        </div>
      </div>
    </div>
  );
}

