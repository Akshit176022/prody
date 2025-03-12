"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const quotes = [
  { text: "The best way to predict the future is to invent it.", person: "Alan Kay" ,designation:'secretary'},
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", person: "Winston Churchill",designation:'secretary' },
  { text: "Opportunities don&apos;t happen. You create them.", person: "Chris Grosser" ,designation:'secretary'},
  { text: "The only limit to our realization of tomorrow is our doubts of today.", person: "Franklin D. Roosevelt",designation:'secretary' },
];

const Messages = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[40vw] h-[30vh] mt-20 ml-20 flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {quotes.map((quote, i) =>
          i === index ? (
            <motion.div
              key={quote.text}
              className="absolute w-[35vw] h-[20vh] flex flex-col items-center justify-center  backdrop-blur-md border border-white/30 text-white text-lg font-semibold p-8 rounded-xl shadow-xl text-center"
              initial={{ y: 50, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-2xl">&quot;{quote.text}&quot;</p>

            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default Messages;
