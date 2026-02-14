"use client";

import Burger from "../home/components/hamburger";

export default function Members() {
  return (
    <div className="min-h-screen bg-cover bg-center font-sans">
      <Burger />

      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-2xl -mt-32 font-thin mx-8">
          The team will be revealed soon — stay tuned for exciting updates! 🚀
        </div>
      </div>
    </div>
  );
}
