"use client";

import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";

export default function Members() {
  return (
    <div className="min-h-screen  flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-white text-4xl font-semibold tracking-wide">
         Team will be revealed soon — stay tuned for exciting updates! 🚀
        </h1>
      </div>

      <Footer />
    </div>
  );
}
