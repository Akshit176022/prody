"use client";
import React, { useState, useEffect, useCallback } from 'react';

const Timer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds countdown
  const [isActive, setIsActive] = useState<boolean>(false);

  // Start the timer
  const startTimer = useCallback(() => {
    setIsActive(true);
  }, []);

  // Reset the timer
  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(60);
  }, []);

  // Handle timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Format time to display as MM:SS
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-gray-800 rounded-lg shadow-lg">
      <div className="text-4xl font-mono font-bold text-blue-400">
        {formatTime(timeLeft)}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={startTimer}
          disabled={isActive}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          Start
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;