import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Redirect() {
  return (
    <div>
      <div  className="relative bg-[url('/images/h1.png')] bg-cover bg-center flex inset-0 min-h-screen">
  <div className="absolute inset-0 backdrop-blur-lg bg-black bg-opacity-60 z-0"></div>
     <div className="relative z-10 flex flex-row mx-auto text-white mt-64">
            <motion.div
            initial ={{x:96}}
            animate={{x:0}}
            transition ={{duration:.6}}>
              <Image
            height={100}
            width={100}
             src="/images/logo.png" alt="Logo" 
             className=" w-20 h-32 mt-4" />


            </motion.div>
            <motion.div
            initial ={{opacity:0}}
            animate={{opacity:1}}
            transition ={{duration:2}}>
                          <div className="text-3xl mt-16">PRODYOGIKI&apos;25</div>
            </motion.div>
            

          </div>
          </div> 
    </div>
  )
}
  