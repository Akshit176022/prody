"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const EventRegister = () => {
  const [prodyId, setProdyId] = useState("");
  const [teamId, setTeamId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register-event/",
        { user_id: prodyId, team_id: teamId }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/background.webp')" }}
    >
      <motion.div
        className="bg-black border-2 border-teal-600 rounded-[30px] w-[90%] max-w-[400px] p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          Register for Event
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

          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EventRegister;
