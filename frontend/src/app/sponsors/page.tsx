"use client";

import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";

export default function SponsorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1 items-center justify-center">
        <h1 className="text-white text-4xl font-bold tracking-wide">
          Exciting sponsors are coming on board — the official reveal is happening soon. Stay tuned!
        </h1>
        
      </div>



      <Footer />
    </div>
  );
}
