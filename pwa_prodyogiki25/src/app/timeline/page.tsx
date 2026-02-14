"use client"
import { useEffect, useRef } from "react";
import { timelineData, Day } from "@/lib/timeline";
import Burger from "../home/components/hamburger";

const Timeline = () => {
  const eventRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initialize refs array with correct length
    const totalEvents = timelineData.reduce((sum, day) => sum + day.events.length, 0);
    eventRefs.current = Array(totalEvents).fill(null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      { threshold: 0.1 }
    );

    
    const currentRefs = eventRefs.current;
    currentRefs.forEach((event) => {
      if (event) observer.observe(event);
    });

    return () => {
      currentRefs.forEach((event) => {
        if (event) observer.unobserve(event);
      });
    };
  }, []);

  return (
    <div className="min-h-screen p-6 "> 
      <Burger />
      <div className="flex items-center justify-center mt-12">
        <div className="text-white text-3xl font-bold mb-4">Timeline</div>
      </div>

      {timelineData.map((day: Day, dayIndex: number) => {
        // Calculate starting index for this day's events
        let startingIndex = 0;
        for (let i = 0; i < dayIndex; i++) {
          startingIndex += timelineData[i].events.length;
        }

        return (
          <div key={day.day} className="mb-8">
            <h2 className="text-2xl font-bold text-teal-500 mb-4">{day.day}</h2>
            {day.events.map((event, eventIndex) => {
              const refIndex = startingIndex + eventIndex;
              return (
                <div
                  key={`${day.day}-${event.title}-${eventIndex}`}
                  ref={(el) => {
                    eventRefs.current[refIndex] = el;
                  }}
                  className="opacity-100 translate-y-0 transition-all duration-500 ease-in-out bg-teal-900 bg-opacity-20 border-l-4 border-teal-500 p-4 rounded-lg mb-4"
                >
                  <h3 className="text-xl font-semibold text-teal-300">
                    {event.title} 
                  </h3>
                  <p className="text-gray-300">{event.description}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;