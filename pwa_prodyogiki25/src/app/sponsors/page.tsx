"use client";

import Burger from "../home/components/hamburger";

export default function SponsorsPage() {
  return (
    <div className="bg-cover bg-center min-h-screen font-sans text-white">
      <Burger />

      <div className="flex flex-col items-center justify-center h-screen">
        {/* <h1 className="text-4xl font-bold mb-6">Our Partners</h1>  */}
        <h2 className="text-2xl font-thin mx-8 -mt-32">
          Interested in sponsoring us? Join hands with us and be a part of something extraordinary — contact us today at iste@nith.ac.in
        </h2>
      </div>
    </div>
  );
}
