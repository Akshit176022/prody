"use client";
import {  useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";
import { timelineData, Day } from "@/lib/timeline";

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animated track line
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen p-6 ">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mt-24 mb-12"
      >
        <h1 className="text-4xl font-bold  text-white">
          EVENT TIMELINE
        </h1>
      </motion.div>

      <div ref={containerRef} className="relative mx-auto w-[70%]">
        {/* Animated track line */}
        <motion.div
          className="absolute left-[2px] top-0 h-full w-1 bg-teal-500 origin-top"
          style={{ scaleY: pathLength }}
        />
        
        {/* Timeline items */}
        {timelineData.map((day: Day) => (
          <div key={day.day} className="relative mb-12 p-8 pl-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border text-2xl text-white border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-teal-500/10 transition-all duration-300 hover:border-teal-400/3 ">


              {day.day}
              </div>


            {/* Events */}
            {day.events.map((event, eventIndex) => (
              <motion.div
                key={`${day.day}-${event.title}-${eventIndex}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
                className="relative mb-8 mt-8"
              >
                {/* Event dot */}
                <div className="absolute -left-10 top-4 h-4 w-4  rounded-full bg-teal-500 ring-4 ring-teal-500/30" />
                
                {/* Event card */}
                <div className="bg-gray-800/50 backdrop-blur-sm border  border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-teal-500/10 transition-all duration-300 hover:border-teal-400/30">
                  <motion.h3 
                    whileHover={{ x: 5 }}
                    className="text-xl font-semibold text-teal-300 mb-2"
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    whileHover={{ x: 2 }}
                    className="text-gray-300"
                  >
                    {event.description}
                  </motion.p>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-teal-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Timeline;