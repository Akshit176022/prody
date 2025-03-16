"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Burger from "../home/components/hamburger";
import { useSwipeable } from "react-swipeable";
import axios from "axios";
import { useRouter } from "next/navigation";

const cards = [
  {
    id: 1,
    img: "/ws1.svg",
    text: "Join for an amazing workshop on glider construction, learn all about aerodynamics, suitable materials and how to malke your glider fly the farthest !!",
    title: "Glider construction",
    date: "21 March,2025",
  },
  {
    id: 2,
    img: "/ws2.svg",
    text: "Get hands on experience on Lua for Gamedev.Learn to create exciting games that mesmerize the world, and bring out the developer inside you to life !!",
    title: "Lua for Gamedev",
    date: "22 March, 2025",
  },
];

const WorkshopSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(cards[0].title);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length),
    trackMouse: true,
  });

  const handleRegisterClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setName("");
    setRollNo("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to register for a workshop.");
      router.push("/login");
      return;
    }

    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expiration = tokenPayload.exp * 1000;
    if (Date.now() > expiration) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("jwt");
      router.push("/login");
      return;
    }

    try {
      const workshopId = cards.find((card) => card.title === selectedWorkshop)?.id;
      if (!workshopId) {
        throw new Error("Invalid workshop selected.");
      }

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register-workshop/`,
        {
          workshop_id: workshopId,
          user_id: tokenPayload.user_id,
          name,
          roll_no: rollNo,
        },
        {
          headers: { Authorization: ` ${token}` },
        }
      );

      alert("Registration successful!");
      handleModalClose();
      router.push("/profile");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("jwt");
          router.push("/login");
        } else {
          setError("Registration failed. Please try again.");
          console.error("Registration failed:", err);
        }
      } else {
        setError("Registration failed. Please try again.");
        console.error("Registration failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat px-4" {...handlers}>
      <Burger />
      <div className="mt-36 relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl overflow-hidden  rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105">
        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {cards.map((card) => (
            <div key={card.id} className="flex-shrink-0 w-full p-[3px] rounded-2xl  bg-black/40 backdrop-blur-md">
              <div className="flex flex-col items-center opacity-80 rounded-2xl w-full h-full p-4">
                <Image src={card.img} alt={card.title} width={180} height={180} className="mt-4 mb-4 object-cover w-36 h-36 sm:w-44 sm:h-44" />
                <div className="text-center text-sm sm:text-base text-white">{card.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        {cards.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"} cursor-pointer`}
            onClick={() => handleCardChange(index)}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="text-white font-bold text-lg sm:text-2xl">{cards[currentIndex].title}</div>
        <div className="text-white font-bold mt-3 text-base sm:text-lg mb-6">{cards[currentIndex].date}</div>
        {/* <button
          className="mt-4 text-black px-6 py-2 text-sm sm:text-base rounded-full transition-transform transform hover:scale-110"
          style={{ background: "linear-gradient(0deg, #8BDBD8, #70C6F6)" }}
          onClick={handleRegisterClick}
        >
          Register Now
        </button> */}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4">
          <div className="bg-[#121212] p-6 rounded-lg w-full max-w-sm sm:max-w-md">
            <h2 className="text-white text-xl font-bold mb-6">Register for Workshop</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Select Workshop</label>
                <select
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={selectedWorkshop}
                  onChange={(e) => setSelectedWorkshop(e.target.value)}
                >
                  {cards.map((card) => (
                    <option key={card.id} value={card.title}>{card.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2">Roll No.</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  placeholder="Enter your roll number"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className="flex justify-end space-x-2">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit" className="bg-[#70C6F6] text-black px-4 py-2 rounded" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopSlider;