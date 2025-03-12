"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Burger from "../home/components/hamburger";
import Image from "next/image";
import { events } from "@/lib/constants";
import EventRegister from "../componenets/ui/EventRegister";

export default function Event() {
  const [visibleEvent, setVisibleEvent] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string>("");

  const toggleEventDetails = (index: number) => {
    setVisibleEvent((prev) => (prev === index ? null : index));
  };

  const handleRegisterClick = (eventName: string) => {
    setSelectedEvent(eventName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-black bg-cover bg-center font-sans min-h-screen">
        <Burger />
        <div className="text-center pt-24 text-white font-sans text-[28px]">
          OUR EVENTS
        </div>
        <div className="flex flex-col pt-8 text-white">
          <div className="w-full flex flex-col">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="mb-0 w-full flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {visibleEvent !== index && (
                  <motion.div
                    onClick={() => toggleEventDetails(index)}
                    className="w-3/4 border-x-[3px] border-t-[3px] border-b-[1px] border-teal-600 rounded-[20px] py-3 pl-4 text-[24px] cursor-pointer transition-transform duration-500"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {event.name}
                  </motion.div>
                )}

                <motion.div
                  className={`w-3/4 relative mb-10 rounded-[30px] border border-teal-600 overflow-hidden text-white ${
                    visibleEvent === index
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: visibleEvent === index ? 1 : 0,
                    height: visibleEvent === index ? "auto" : "0",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  <motion.div
                    className="cursor-pointer"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: visibleEvent === index ? 1 : 0.8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      width={149}
                      height={149}
                      src={event.image}
                      alt="Event Image"
                      className="w-full h-full object-cover rounded-t-[30px]"
                    />
                    <div className="absolute top-0 bg-transparent w-full px-2 rounded-b-[30px]">
                      <div className="text-center border-2 absolute right-4 top-2 rounded-[4px] w-5/12 text-[10px] border-white">
                        CLICK FOR ABSTRACT
                      </div>
                      <div className="text-center mt-20 text-3xl">{event.name}</div>
                      <div className="text-[14px] mt-2 text-center">
                        {event.description}
                      </div>
                      <div className="text-center p-4">
                        <button
                          className="border px-3 border-white"
                          onClick={() => handleRegisterClick(event.name)}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      
      {isModalOpen && (
        <EventRegister eventName={selectedEvent} onClose={handleCloseModal} />
      )}
    </>
  );
}