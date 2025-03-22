"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import Navbar from '../componenets/Navbar';
import Footer from '../componenets/Footer';
import Link from "next/link";

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  location: string;
  max_participants: number;
  registered_participants: number[]; 
  whatsapp_group: string;

}

const WorkshopSlider = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [isAutoSlideActive, setIsAutoSlideActive] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workshops/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch workshops: ${response.statusText}`);
        }
        const data = await response.json();
        setWorkshops(data);
        setSelectedWorkshop(data[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load workshops. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  useEffect(() => {
    if (workshops.length > 0 && isAutoSlideActive) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % workshops.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [workshops, isAutoSlideActive]);

  const handleCardChange = (index: number) => {
    setCurrentIndex(index);
  };

  const handleCardClick = () => {
    setIsAutoSlideActive((prev) => !prev);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % workshops.length),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) => (prevIndex - 1 + workshops.length) % workshops.length),
    trackMouse: true,
  });

   const handleRegisterClick = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to register for a workshop.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedWorkshop) {
      alert("No workshop selected.");
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to register for a workshop.");
      return;
    }

    setRegistrationLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workshops/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` ${token}`,
        },
        body: JSON.stringify({
          workshop_id: selectedWorkshop.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error response:", errorData);
        throw new Error(errorData.error || "Failed to register for the workshop");
      }

      const data = await response.json();
      alert(data.message);
      handleModalClose();
    } catch (error) {
      console.error("Error registering for workshop:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    } finally {
      setRegistrationLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center min-h-screen bg-cover bg-center bg-no-repeat px-4"
      {...handlers}
    >
      <Navbar />
      <div
        className="mt-32 relative w-[300px] h-[438px] lg:w-[500px] lg:h-[600px] overflow-hidden rounded-[22px] transition-transform duration-300 ease-in-out transform hover:scale-105"
        onClick={handleCardClick}
      >
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              className="flex-shrink-0 w-[351px] h-[438px] lg:w-[500px] lg:h-[600px] p-[2px] rounded-[22px] border-[3px] border-teal-500"
            >
              <div className="flex flex-col items-center rounded-[22px] w-full h-full p-4   opacity-80">
                <Image
                  src={workshop.image}
                  alt={workshop.title}
                  width={200}
                  height={200}
                  className="mt-4 mb-4 object-cover lg:w-72 lg:h-72"
                />
                <div className="text-center text-md lg:text-lg text-white mx-4">
                  {workshop.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        {workshops.map((_, index) => (
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
          {workshops[currentIndex]?.title}
        </div>
        <div className="text-white font-bold mt-6 text-lg lg:text-2xl mb-6">
          {new Date(workshops[currentIndex]?.date).toLocaleDateString()}
        </div>
  <div className="text-white text-lg lg:text-xl mb-6">
    Location: {workshops[currentIndex]?.location}
  </div>
  <div className="text-white text-lg lg:text-xl mb-6">
  WhatsApp Group:{" "}
  <Link
    href={workshops[currentIndex]?.whatsapp_group}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-400 underline"
  >
    Join WhatsApp Group
  </Link>
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-[#121212] p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-white text-2xl font-bold mb-4">Register for Workshop</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">
                  Select Workshop
                </label>
                <select
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  value={selectedWorkshop?.id || ""}
                  onChange={(e) => {
                    const selected = workshops.find((w) => w.id === parseInt(e.target.value));
                    setSelectedWorkshop(selected || null);
                  }}
                >
                  {workshops.map((workshop) => (
                    <option key={workshop.id} value={workshop.id}>
                      {workshop.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
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
                  disabled={registrationLoading}
                >
                  {registrationLoading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default WorkshopSlider;