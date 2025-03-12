"use client"
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function Landing() {

  useEffect(() => {
    setTimeout(() => {
      redirect('/home');
    }, 5000);
  }, []);

  return (
    <motion.div
      className="bg-[url('/images/image.png')] bg-cover bg-center h-screen"
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ duration: 6}}
    >
      

      <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1 }}
      transition={{ delay:1, duration: 6}}

    >
        <div className="justify-center text-center pt-[100px] text-black text-[20px]">
        I S T E - N I T H
      </div>
      <Image 
      className="mx-auto h-52 mt-4 w-40" src="/images/prodylogoblack-01.png" alt="Logo"
      width={400}
      height={400} />
      <div className="pt-4 text-center text-black text-[31px]">
        P R O D Y O G I K I
      </div>
      <div className=" text-center pt-52 text-white text-[32px]">
        24-26th January
      </div>
      </motion.div>
    </motion.div>
  );
}