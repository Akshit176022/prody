"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
export default function Landing() {
  const [removeBorders, setRemoveBorders] = useState(false);


    useEffect(() => {
      setTimeout(() => {
        redirect('/home');
      }, 5000);
    }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setRemoveBorders(true);
    }, 3000);



    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="ml-1 justify-between gap-2 pt-96 flex flex-row">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className={`w-8 border-y-4 border-[#435295]  shadow-yellow-600 border-r-4 text-right text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            P
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div
            className={`-mt-16 relative w-10  border-x-4 h-28 border-[#435295] shadow-2xl align-text-bottom border-b-4 text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            <div className="absolute left-1 bottom-2">R</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: .6 }}
        >
          <div
            className={`border-x-4 h-28 border-t-4 text-[#008080] border-[#DD6D6D] shadow-2xl text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            O
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: .9 }}
        >
          <div
            className={`-mt-16 relative w-10 border-x-4 border-[#435295] shadow-2xl h-28 border-b-4 text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            <div className="absolute left-[3px] bottom-2">D</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
        >
          <div
            className={`-mt-16 relative w-10 border-x-4 border-[#435295] shadow-2xl h-28 border-b-4 text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            <div className="absolute bottom-2">Y</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 1.5 }}
        >
          <div
            className={`relative w-10 border-x-4 border-[#DD6D6D] shadow-2xl h-28 border-t-4 text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            <div className="text-[#008080]">O</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 1.8 }}
        >
          <div
            className={`-mt-16 relative w-10 border-x-4 h-28 border-b-4 border-[#435295] shadow-2xl text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            <div className="absolute bottom-2">G</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 2.1 }}
        >
          <div
            className={`-mt-16 relative w-8 border-x-4 h-28 border-b-4 border-[#435295] shadow-2xl text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            <div className="absolute bottom-2 left-2">I</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 2.4 }}
        >
          <div
            className={`border-x-4 h-28 border-t-4 text-[#008080] border-[#DD6D6D] w-8 shadow-2xl text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            K
          </div>
        </motion.div>

        <motion.div
          initial={{ y: -700 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.3, delay: 2.7 }}
        >
          <div
            className={`relative w-8 border-y-4 border-l-4 border-[#435295] shadow-2xl text-4xl ${removeBorders ? 'border-none' : ''}`}
          >
            <div>I</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
