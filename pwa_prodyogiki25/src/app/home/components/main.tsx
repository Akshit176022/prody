import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedTestimonials } from "@/app/componenets/ui/animated-testimonials";
import { testimonials } from "@/lib/constants";
// Importing icons from react-icons
import { FaRegCalendarAlt, FaRegLightbulb } from "react-icons/fa";
import Link from "next/link";

export default function Main() {
  return (
    <div>
      <div className="flex flex-row">
        <div className="flex w-7/12 flex-col">
          <div className="flex ml-8 pt-36 leading-[22px] tracking-[-0.4px] text-white text-[17px]">
            ISTE-NITH PRESENTS
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 4 }}
          >
            <div className="flex ml-12 mt-0">
              <div className="flex flex-col mt-3 -ml-4 font-bold text-[28px] text-gradient bg-gradient-to-r from-[#59F7E2] to-white text-transparent bg-clip-text">
                PRODYOGIKI&apos;25
              </div>
            </div>
            <div className="ml-8 -mt-2 text-white text-[15px] text-opacity-60">
              24-26th January
            </div>
            <div className="w-full h-[1px] mt-5 bg-gradient-to-r from-transparent via-custom to-transparent"></div>
            <div className="mt-2 ml-8 text-white text-[14px]">
              REALMS OF ENGINEERING MARVELS
            </div>
          </motion.div>
        </div>
        <motion.div
          className="h-[200px] ml-6 w-[160px] mt-44"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 2 }}
        >
          <Image width={400} height={800} src="/images/im.png" alt="Logo" />
        </motion.div>
      </div>

      <div className="text-white border-b-4 mx-auto text-[17px] z-50 border-[#008080] text-center border-2 w-[219px] h-[48px] rounded-3xl p-2">
        WHAT IS PRODYOGIKI?
      </div>

      <div className="flex mt-7 flex-row">
        <div className="w-2/4 ml-4 overflow-hidden">
          <AnimatedTestimonials testimonials={testimonials} />
        </div>

        <div className="w-6/12 ml-4 mr-2 h-[205px] text-[13px] text-white">
          s vitae amet! Consequuntur, laudantium ut? Lorem ipsum dolor sit amet.
          consectetur adipisicing elit. Aspernatur adipisci repudiandae, tempore
          quis sed sint ex maxime odit voluptatem. Obcaecati pariatur facere
          fugiat nemo! Doloribus quisquam culpa quo sequi! Distinctio!
        </div>
      </div>

      <div className="flex flex-row pt-16">
        <div className="flex flex-row mx-auto">
          <div className="text-white border-b-4 mx-auto text-[17px] border-[#008080] text-center border-2 w-[219px] h-[48px] rounded-3xl p-2">
            FOR YOU
          </div>
        </div>
      </div>

      <div className="pt-10 flex justify-around flex-row">
        <Link href="/events" className="w-5/12 h-[150px] border-2 rounded-2xl flex flex-col">
          <div className="mt-5 mx-auto rounded-full bg-custom w-12 h-12 flex items-center justify-center">
            <FaRegCalendarAlt className="text-white text-[24px]" />
          </div>
          <div className="mt-5 mx-auto text-white">
            EVENTS
          </div>
          <div className="w-full h-[1px] mt-3 bg-gradient-to-r from-transparent via-custom to-transparent"></div>
        </Link>

        <Link href="/workshop" className="w-5/12 h-[150px] border-2 rounded-2xl flex flex-col" >
          <div className="mt-5 mx-auto rounded-full bg-custom w-12 h-12 flex items-center justify-center">
            <FaRegLightbulb className="text-white text-[24px]" />
          </div>
          <div className="mt-5 mx-auto text-white">
            WORKSHOPS
          </div>
          <div className="w-full h-[1px] mt-3 bg-gradient-to-r from-transparent via-custom to-transparent"></div>
        </Link>
      </div>
    </div>
  );
}
