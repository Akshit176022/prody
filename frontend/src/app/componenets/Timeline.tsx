'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const days = ['Day 1', 'Day 2', 'Day 3'];
const content = [
  {
    title: 'Day 1: Introduction',
    description: 'Introduction to the event and ice-breaking activities.',
    time: '10:00 AM - 12:00 PM',
  },
  {
    title: 'Day 2: Workshops',
    description: 'Technical workshops and hands-on projects.',
    time: '9:00 AM - 5:00 PM',
  },
  {
    title: 'Day 3: Presentations',
    description: 'Final presentations and closing ceremony.',
    time: '10:00 AM - 2:00 PM',
  },
];

export default function HorizontalTimeline() {
  const [selected, setSelected] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for Timeline
  useEffect(() => {
    if (timelineRef.current) {
      const timelineNodes = timelineRef.current.querySelectorAll('.timeline-node');
      gsap.from(timelineNodes, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <div className="w-[80%] h-[50vh] ml-48 -mt-20 flex flex-col items-center justify-center bg-gradient-to-r from-black via-teal-900 to-black text-white">


<button className="mt-4 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-all">
        Explore Timeline
      </button>

      <motion.div
        key={selected}
        className="w-[80%] mt-10 p-6 bg-gray-900 rounded-xl shadow-lg border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-2 text-teal-500">{content[selected].title}</h2>
        <p className="text-gray-300 mb-4">{content[selected].description}</p>
        <p className="text-sm text-gray-400">{content[selected].time}</p>
      </motion.div>

      {/* Explore Button */}

      <div className="relative w-[80%] h-1 mt-8 bg-gray-700 mb-4">
        <motion.div
          className="absolute top-0 left-0 h-1 bg-teal-500"
          initial={{ width: '0%' }}
          animate={{ width: `${(selected / (days.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div ref={timelineRef} className="relative  w-[80%] flex justify-between">
        {days.map((day, index) => (
          <div key={index} className="relative flex flex-col items-center timeline-node">
            {/* Node Circle */}
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer border-4 ${
                selected === index ? 'bg-teal-500 border-teal-500' : 'bg-gray-800 border-gray-700'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelected(index)}
            >
              <span className="text-white font-semibold">{index + 1}</span>
            </motion.div>

            {/* Day Label */}
            <p className="mt-2 text-sm font-semibold text-gray-300">{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}