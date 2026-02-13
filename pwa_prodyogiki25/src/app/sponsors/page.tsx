"use client";

import Burger from "../home/components/hamburger";

export default function SponsorsPage() {
  return (
    <div className="bg-cover bg-center min-h-screen font-sans text-white">
      <Burger />

      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-6">Our Partners</h1>
        <h2 className="text-3xl font-semibold">
          Coming Soon
        </h2>
      </div>
    </div>
  );
}
