"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Landing() {
  const [removeBorders, setRemoveBorders] = useState(false);
  const [glowText, setGlowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRemoveBorders(true);
    }, 3000);

    const glowTimer = setTimeout(() => {
      setGlowText(true);
    }, 3300);

    return () => {
      clearTimeout(timer);
      clearTimeout(glowTimer);
    };
  }, []);

  const letters = ['P', 'R', 'O', 'D', 'Y', 'O', 'G', 'I', 'K', 'I']; // List of letters

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="ml-1 justify-between gap-2 pt-96 flex flex-row">
        {letters.map((letter, index) => {
          // Generate unique key by combining letter and index
          const key = `${letter}-${index}`;

          const delays = [0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4, 2.7];

          return (
            <motion.div
              key={key} // Use the unique key
              initial={{ y: index % 2 === 0 ? -700 : 700 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: delays[index] }}
            >
              <div
                className={`relative w-8 h-28 text-4xl border-4 ${removeBorders ? 'border-none' : ''} ${
                  glowText ? 'text-[#008080] glow-text' : ''
                }`}
                style={{
                  borderColor: index % 2 === 0 ? '#435295' : '#DD6D6D',
                  boxShadow: '0px 0px 8px rgba(255, 255, 255, 0.5)',
                }}
              >
                <div
                  className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
                  style={{ color: index % 2 === 0 ? '#008080' : 'inherit' }}
                >
                  {letter}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
