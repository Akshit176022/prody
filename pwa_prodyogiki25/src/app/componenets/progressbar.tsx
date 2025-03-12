import React, { useState } from "react";
import { MdKeyboardArrowDown,MdOutlineKeyboardArrowUp  } from "react-icons/md"; 

interface CircularProgressBarProps {
  events: number;
  eventNames: string[]; 
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  events,
  eventNames,
}) => {
  const [showDetails, setShowDetails] = useState(false); 

  const radius = 50; 
  const stroke = 10; 
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset =
    circumference - (events / 10) * circumference;

  const handleClick = () => {
    setShowDetails(!showDetails); 
  };

  return (
    <div className="relative flex flex-col items-center justify-center ">
      <div className="flex">
        <div className="text-md font-semibold text-white cursor-pointer" onClick={handleClick}>
          Number of Events Registered
        </div>
        <div className="pl-4 cursor-pointer" onClick={handleClick}>
          
          {showDetails ? (
            <MdKeyboardArrowDown size={24} className="text-white"/> 
          ) : (
            <MdOutlineKeyboardArrowUp size={24} className="text-white"/>
          )}
        </div>
      </div>
      {!showDetails && ( 
        <div className="mt-10 text-white"> 
          <svg
            height={radius * 2}
            width={radius * 2}
            role="progressbar"
            className="transform"
            aria-valuenow={events}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <defs>
              <linearGradient id="gradient0" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="100%" stopColor="#54FF65" /> 
                <stop offset="100%" stopColor="#007CEF" /> 
              </linearGradient>
            </defs>
            <circle
              stroke="url(#gradient0)"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              opacity={0.2}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#54FF65" /> 
                <stop offset="100%" stopColor="#007CEF" /> 
              </linearGradient>
            </defs>
            <circle
              stroke="url(#gradient)" 
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
            
            <text
  x="50%"
  y="50%"
  textAnchor="middle"
  dy=".3em"
  fill="white" // Apply color directly using fill
  className="text-xl font-bold"
>
  {events}
</text>

          </svg>
        </div>
      )}

      {showDetails && (  
        <div>
          <ol className="list-decimal pr-14 text-md text-white font-semibold ">
            {eventNames.map((event, index) => (
              <li className='text-white'key={index}>{event}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default CircularProgressBar; 