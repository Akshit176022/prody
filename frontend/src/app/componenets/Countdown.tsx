"use client";
import { useState, useEffect } from "react";

export default function Countdown() {
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      setTimeout(() => {
        setCount(0);
        setIsPaused(false);
      }, 3000); // Hold at 10 for 3 seconds
      return;
    }

    if (count < 12) {
      const timer = setTimeout(() => {
        setCount(count + 1);
      }, 50); // Adjust speed (200ms per count)

      return () => clearTimeout(timer);
    }

    setIsPaused(true);
  }, [count, isPaused]);

  return (
    <div className="flex items-center justify-center ml-16 mt-4 bg-transparent  border-2 w-28  h-12 rounded-[4px] border-white ">
      <div className="hover:scale-105 hover:cursor-pointer relative flex items-center justify-center  text-white text-4xl font-bold shadow-lg">
        {count}
      </div>
    </div>
  );
}
