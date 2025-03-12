"use client"
import React, { useState,useEffect } from 'react';
import { redirect } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Landing() {
  const [animateBack, setAnimateBack] = useState(false);

  const handleAnimationComplete = () => {
    setAnimateBack(true);
  };

useEffect (() => {
  setTimeout(() => {
    redirect('/home');
  }, 2500);
}
)
  return (
    <div className="bg-black flex text-white min-h-screen  overflow-hidden">
      <div className="justify-between mx-auto my-auto items-center">
        <motion.div
          initial={{ rotate: 0, scale: 0.5 }} 
          animate={animateBack ? { rotate: 0, scale: 0.5 } : { rotate: -30, scale: .8 }} 
          transition={{ duration: .8}}
          onAnimationComplete={handleAnimationComplete} 
        >
          <Image 
          height={160}
          width={140}
          className="" src="/images/logo.png" alt="Logo" />
        </motion.div>
      </div>
    </div>
  );
}
