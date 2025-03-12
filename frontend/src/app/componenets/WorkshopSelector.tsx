"use client";
import { useState } from "react";

// Define Props Interface
interface WorkshopSelectorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function WorkshopSelector({ isOpen, setIsOpen }: WorkshopSelectorProps) {
  const [selectedWorkshop, setSelectedWorkshop] = useState<string>("");

  const workshops: string[] = ["Git & GitHub Workshop", "Open Source Month Workshop", "React & Tailwind Workshop", "Backend Development Bootcamp"];

  const handleRegister = () => {
    if (selectedWorkshop) {
      alert(`You have registered for ${selectedWorkshop}!`);
      setIsOpen(false); // Close after registration
    } else {
      alert("Please select a workshop first.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-70 backdrop-blur-md" onClick={() => setIsOpen(false)}>
      <div className="p-6 bg-black rounded-xl border-2 border-blue-500 animate-pulse hover:animate-none shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">Select a Workshop</h2>
        <select className="w-full p-2 rounded-md bg-gray-800 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500" value={selectedWorkshop} onChange={(e) => setSelectedWorkshop(e.target.value)}>
          <option value="" disabled>Choose a workshop</option>
          {workshops.map((workshop, index) => (
            <option key={index} value={workshop}>{workshop}</option>
          ))}
        </select>
        <button className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300" onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
