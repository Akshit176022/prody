"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import Navbar from '../componenets/Navbar';
import Footer from '../componenets/Footer';

const cards = [
  {
    id: 1,
    img: "/ws1.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla, neque iusto libero aliquid, enim magni, corporis quam ullam molestiae odit possimus eaque ex!",
    title: "WORKSHOP 1",
    date: "7TH FEB",
  },
  {
    id: 2,
    img: "/ws2.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla, neque iusto libero aliquid, enim magni, corporis quam ullam molestiae odit possimus eaque ex!",
    title: "WORKSHOP 2",
    date: "8TH FEB",
  },
  {
    id: 3,
    img: "/ws2.svg",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet nulla, neque iusto libero aliquid, enim magni, corporis quam ullam molestiae odit possimus eaque ex!",
    title: "WORKSHOP 3",
    date: "8TH FEB",
  },
];

const WorkshopSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(cards[0].title);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCardChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length),
    onSwipedRight: () => setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length),
    trackMouse: true,
  });

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Registered for:", selectedWorkshop, "Name:", name, "Roll No:", rollNo);
    setIsModalOpen(false); 
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat "
      {...handlers}
    >
      <Navbar/>
      <div className="mt-32 relative w-[351px] h-[438px] lg:w-[500px] lg:h-[600px] overflow-hidden rounded-[22px] transition-transform duration-300 ease-in-out transform hover:scale-105">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0 w-[351px] h-[438px] lg:w-[500px] lg:h-[600px] p-[2px] rounded-[22px] border-[3px] border-teal-500 "
              style={{
                background: "",
              }}
            >
              <div className="flex flex-col items-center rounded-[22px] w-full h-full p-4 ">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={200}
                  height={200}
                  className="mt-4 mb-4 object-cover w-40 h-40 lg:w-56 lg:h-56"
                />
                <div className="text-center text-sm lg:text-base text-white mx-4">
                  {card.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="flex space-x-2 mt-4">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            } cursor-pointer`}
            onClick={() => handleCardChange(index)}
          />
        ))}
      </div>

  
      <div className="mt-10 text-center">
        <div className="text-white font-bold text-2xl lg:text-4xl">
          {cards[currentIndex].title}
        </div>
        <div className="text-white font-bold mt-6 text-lg lg:text-2xl mb-6">
          {cards[currentIndex].date}
        </div>

        <div
          className="mt-6 text-black px-10 py-3 text-base lg:text-lg rounded-full cursor-pointer transition-transform transform hover:scale-110 mb-32"
          style={{
            background: "linear-gradient(0deg, #8BDBD8, #70C6F6)",
          }}
          onClick={handleRegisterClick}
        >
          Register Now
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-[#121212] p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-white text-2xl font-bold mb-4">Register for Workshop</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Select Workshop
                </label>
                <select
                  className="w-full p-2 rounded  text-black"
                  value={selectedWorkshop}
                  onChange={(e) => setSelectedWorkshop(e.target.value)}
                >
                  {cards.map((card) => (
                    <option key={card.id} value={card.title}>
                      {card.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded text-black"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">
                  Roll No.
                </label>
                <input
                  type="text"
                  className="w-full p-2 rounded  text-black"
                  placeholder="Enter your roll number"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end ">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={handleModalClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#70C6F6] text-black px-4 py-2 rounded"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
  
        </div>

      )}
      <Footer/>
    </div>
  );
};

export default WorkshopSlider;