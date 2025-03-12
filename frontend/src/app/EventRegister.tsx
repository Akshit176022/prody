"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface RegisterModalProps {
  eventName: string;
  onClose: () => void;
}

const EventRegister: React.FC<RegisterModalProps> = ({ eventName, onClose }) => {
  const [prodyId, setProdyId] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Prody ID:", prodyId);
    console.log("Team ID:", teamId);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      
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

export default EventRegister;