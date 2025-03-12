import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const events = [
  { id: 1, title: "Event 1", image: "/images/event1.jpeg" },
  { id: 2, title: "Event 2", image: "/images/event2.jpeg" },
  { id: 3, title: "Event 3", image: "/images/1.jpeg" },
];

export default function Events() {
  const navigateToEvents = () => {
    window.location.href = "/events";
  };

  const [index, setIndex] = useState(0);

  // Auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="h-[60vw] mt-12 ml-12 flex flex-col items-center justify-center space-y-4 p-4"onClick={navigateToEvents}>
      {/* Carousel Window */}
      <div className="relative w-[25vw] h-[60vh] overflow-hidden rounded-2xl shadow-lg flex items-center justify-center">
        <AnimatePresence>
          <motion.div
            key={events[index].id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            <Image
              src={events[index].image}
              alt={events[index].title}
              width={640}
              height={480} 
              className="rounded-2xl object-cover cursor-pointer w-full h-full"
            />
          </motion.div>
        </AnimatePresence>
      </div>


<div className="text-4xl pt-8 text-white">EXPLORE EVENTS</div>

      {/* Text Section */}
      <div className="pt-4 text-white text-left px-4 w-[28vw] text-xl">
        <p>
          Join us for an exciting series of events! Participate, learn, and showcase your skills. Register now and be a
          part of something amazing.
        </p>
      </div>
    </div>
  );
}
