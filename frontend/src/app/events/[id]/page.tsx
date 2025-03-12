"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { events, Event } from "../../../../public/data/event";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/app/componenets/Navbar";
import Footer from "@/app/componenets/Footer";
const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = events.find((event) => event.id === parseInt(id));
    setEvent(foundEvent || null);
  }, [id]);

  if (!event) {
    return <div className="p-8 text-center">Event not found!</div>;
  }

  const handleRegisterClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/background.webp')",
      }}
    >
      
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md"
        style={{
          WebkitBackdropFilter: "blur(10px)",
        }}
      ></div>
      {/* Event Details Content */}
      <Navbar/>
      <main className="relative py-32 z-10">
        <div className="max-w-4xl mx-auto my-auto p-6 rounded-3xl shadow-lg border-4 border-teal-700 backdrop-blur-sm">
          <div className="flex space-x-6">
            <Image
              src={event.photoUrl}
              alt={event.name}
              className="w-96 ml-4 mt-4 h-64 border-2 border-teal-500 rounded-2xl object-cover"
              height={256}
              width={384}
            />
            <p className="text-white pt-5 pr-4 pl-4 pb-5 text-base">
              {event.description}
            </p>
          </div>
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
            <div className="space-y-4 space-x-4">
              <a
                href={event.abstractLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                View Abstract
              </a>
              <button
                onClick={handleRegisterClick} // Open the modal on click
                className="inline-block bg-teal-500 text-white px-8 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        <div className='mb-12'></div>
        <Footer/>
      </main>
      

      {/* Registration Modal */}
      {isModalOpen && (
        <EventRegister eventName={event.name} onClose={handleCloseModal} />
      )}
      
    </div>
  );
};

// Registration Modal Component
const EventRegister: React.FC<{ eventName: string; onClose: () => void }> = ({
  eventName,
  onClose,
}) => {
  const [prodyId, setProdyId] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Prody ID:", prodyId);
    console.log("Team ID:", teamId);
    console.log("Event Name:", eventName); // Log the event name
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-md"
        style={{
          WebkitBackdropFilter: "blur(10px)",
        }}
        onClick={onClose} // Close modal when clicking outside
      ></div>

      {/* Modal Content */}
      <motion.div
        className="bg-black border-2 border-teal-600 rounded-[30px] w-[90%] max-w-[400px] p-6 relative z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Register for {eventName}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Prody ID</label>
            <input
              type="text"
              value={prodyId}
              onChange={(e) => setProdyId(e.target.value)}
              className="w-full p-2 border border-teal-600 bg-black text-white rounded-[10px]"
              placeholder="Enter your Prody ID"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-white text-sm mb-2">Team ID</label>
            <input
              type="text"
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full p-2 border border-teal-600 bg-black text-white rounded-[10px]"
              placeholder="Enter your Team ID"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-600 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EventDetails;