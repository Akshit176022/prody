"use client";

import Link from "next/link";

export default function Timeline() {
  return (
    <div className="flex flex-col w-full h-full pt-16">

      <div className="text-white border-b-4 mx-auto text-[17px] border-[#008080] text-center border-2 w-[219px] h-[48px] rounded-3xl p-2">
        <Link href="/timeline">TIMELINE</Link>
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="text-white text-3xl font-bold mt-16">
          Coming Soon
        </div>
      </div>

    </div>
  );
}
