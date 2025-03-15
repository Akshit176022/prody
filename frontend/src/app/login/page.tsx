"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../componenets/Navbar";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      localStorage.setItem("jwt", response.data.jwt);
      console.log("Token stored in localStorage:", response.data.jwt); 
  
      router.push("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-5 mb-12 items-center lg:pt-12 relative">
      <Navbar />
      <div className="flex items-center justify-center w-[90%] max-w-[500px] sm:mb-12 mt-16 mb-6">
        <h2 className="text-white text-4xl sm:text-5xl font-black">Login</h2>
      </div>
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
          {errorMessage}
        </div>
      )}
      <motion.div
        className="p-6 mx-2 sm:border-[3px] bg-opacity-20 bg-slate-200 border-[#1B7774] w-[90%] max-w-[500px] lg:max-w-[460px] rounded-3xl h-auto flex flex-col justify-center items-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {["email", "password"].map((field, index) => (
          <div key={index} className="w-full max-w-[450px] mb-11 sm:mb-9">
            <label
              htmlFor={field}
              className="block text-white font-semibold sm:font-bold text-lg sm:text-xl mb-2"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="relative h-[70px] sm:h-[80px]">
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="mt-2 p-3 pl-5 sm:pl-6 border-b-[1px] border-[3px] border-[#1B7774] bg-[#1B6665] opacity-80 text-white rounded-2xl w-full h-full placeholder-white text-lg"
                placeholder={`Enter your ${field}`}
              />
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl h-16 w-52 hover:scale-105 transition delay-100 duration-300 ease-in-out text-lg"
        >
          Login
        </button>
        <div className="mt-6 text-white text-lg">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-white font-semibold hover:underline">
            Sign Up
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;