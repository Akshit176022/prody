"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";

const events = [
  {
    name: "Abhedya 4.0",
    date: "1st April",
    description: "Description for Abhedya Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Breach-o-Beach",
    date: "4th April",
    description: "Description for Breach-O Beach Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Chemystrey 2.O",
    date: "5th April",
    description: "Description for Chemystrey 3.0 Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    name: "Bidwiser",
    date: "6th April",
    description: "Description for Bidwiser Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
];

const Display = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length),
    onSwipedRight: () => setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length),
    trackMouse: true,
  });

  return (
    <div className="relative w-[70vw] sm:h-[48vw] overflow-hidden" {...handlers}>
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentEventIndex * 100}%)` }}
      >
        {events.map((event, index) => (
          <div key={index} className="relative w-[70vw] sm:h-[48vw] flex-shrink-0">
            <Image
              src="Frame.svg"
              alt="frame"
              width={282}
              height={196}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 z-1 flex items-start space-x-2">
              <div className="bg-[#D25E5E] ml-4 mt-4 w-[0.3vw] overflow-hidden h-[12vw]"></div>
              <div>
                <div className="font-bold text-lg mt-2.5 text-white">{event.name} </div>
                <div className="text-base text-white">{event.date}</div>
              </div>
            </div>
            <div className="absolute top-20 w-[57vw] h-[0.25vh] bg-[#474747] ml-6"></div>
            <div className="absolute top-24 flex justify-between items-center w-full px-4">
              <div className="w-[40vw] text-xs text-white">
                {event.description}
              </div>
              <div className="w-[14vw] h-[7vh] bg-white rounded m-0 p-0"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;