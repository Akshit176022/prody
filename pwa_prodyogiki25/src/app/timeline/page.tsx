"use client"
import { useEffect, useRef } from "react";
import { timelineData, Day } from "@/lib/timeline";
import Burger from "../home/components/hamburger";

const Timeline = () => {
  const eventRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    eventRefs.current.forEach((event) => {
      if (event) observer.observe(event);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black p-6">
      <Burger/>
      <div className="flex items-center justify-center bg-black mt-12">
  <div className="text-white text-2xl font-semibold">Timeline</div>
</div>

      {timelineData.map((day: Day, dayIndex: number) => (
        <div key={day.day} className="mb-8 ">
          
          <h2 className="text-2xl font-bold text-teal-500 mb-4">{day.day}</h2>
          {day.events.map((event, eventIndex) => {
            const refIndex = dayIndex * day.events.length + eventIndex;
            return (
              <div
  key={event.title}
  ref={(el) => {
    if (el) {
      eventRefs.current[refIndex] = el; // Assign the ref only if el is not null
    }
  }}
  className="opacity-0 translate-y-10 transition-all duration-500 ease-in-out bg-teal-900 bg-opacity-20 border-l-4 border-teal-500 p-4 rounded-lg mb-4"
>
                <h3 className="text-xl font-semibold text-teal-300">
                  {event.title}
                </h3>
                <p className="text-gray-300">{event.description}</p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Timeline;