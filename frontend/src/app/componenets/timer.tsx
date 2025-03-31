"use client";
import { useState, useEffect } from "react";

type TargetDateResponse = {
  targetDate: string; 
};

const CountdownTimer = () => {
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchTargetDate = async () => {
      try {
        const response = await fetch("/data/target-date.json"); 
        if (!response.ok) {
          throw new Error("Failed to fetch target date");
        }
        const data: TargetDateResponse = await response.json();
        const date = new Date(data.targetDate);
        setTargetDate(date);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch target date:", err);
        setError("Failed to load countdown. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchTargetDate();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        Loading countdown...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        {error}
      </div>
    );
  }

  if (!targetDate) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        No target date found.
      </div>
    );
  }

  return (

<div className="ml-32" >
<div className="bg-black backdrop-blur-md  rounded-3xl shadow-2xl mt-12  text-white border-2 mx-[20%] justify-center h-64 border-white">
        <h1 className="text-3xl font-bold mb-8 text-center mt-8 ">TIME LEFT</h1>
        <div className="flex gap-4 justify-center">

          <div className="flex flex-col  ">
            <div className="flex flex-row">
            <span className="text-5xl font-mono font-bold">{timeLeft.days}</span>
            <span className="text-5xl ml-2 font-mono font-bold">:</span>
            </div>
  
            <span className="text-lg ">Days</span>
          </div>

          <div className="flex flex-col ">
            <div className="flex flex-row">
            <span className="text-5xl font-mono font-bold">{timeLeft.hours}</span>
            <span className="text-5xl ml-2 font-mono font-bold">:</span>
            </div>

            <span className="text-lg">Hours</span>
          </div>

          <div className="flex flex-col ">
            <div className="flex flex-row">
            <span className="text-5xl font-mono font-bold">{timeLeft.minutes}</span>
            <span className="text-5xl ml-2 font-mono font-bold">:</span>
            </div>
 
            <span className="text-lg">Minutes</span>
          </div>

          <div className="flex flex-col ">
            <span className="text-5xl font-mono font-bold">{timeLeft.seconds}</span>
            <span className="text-lg">Seconds</span>
          </div>
        </div> 
      </div>
</div>

  );
};

export default CountdownTimer;