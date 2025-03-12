"use client";
import React, { useState } from "react";
import { motion } from "framer-motion"; 

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }, 
  };

  return (
    <div className="min-h-screen flex flex-col pt-5 mb-12 items-center lg:pt-0 relative">
      
      {/* Heading */}
      <div className="flex items-center justify-center w-[90%] max-w-[500px] sm:mb-12 mt-8 mb-6">
        <h2 className="text-white text-4xl sm:text-5xl font-bold">SIGN UP</h2>
      </div>

      {/* Signup Box */}
      <motion.div
        className="p-8 mx-2 sm:border-[3px] bg-opacity-20 bg-slate-200 border-[#1B7774] w-[60%] max-w-[500px] lg:max-w-[460px] rounded-3xl h-auto flex flex-col justify-center items-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {["name", "email", "password"].map((field, index) => (
          <div key={index} className="w-full max-w-[450px] mb-11 sm:mb-9">
            <label
              htmlFor={field}
              className="block text-white font-semibold sm:font-bold text-lg sm:text-xl mb-2"
            >
              {field === "name"
                ? "Username" 
                : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="relative h-[70px] sm:h-[80px]">
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="mt-2 p-3 pl-5 sm:pl-6 border-b-[1px] border-[3px] border-[#1B7774] bg-[#1B6665] opacity-80 text-white rounded-2xl w-full h-full placeholder-white/80 text-lg"
                placeholder={
                  field === "name"
                    ? "Enter your username" 
                    : `Enter your ${field}`
                }
              />
            </div>
          </div>
        ))}

        {/* Signup Button */}
        <button
          onClick={handleSubmit}
          className="mt-6 px-6 border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl h-16 w-52 hover:scale-105 transition delay-100 duration-300 ease-in-out text-lg"
        >
          Sign Up
        </button>

        {/* Already have an account? */}
        <div className="mt-6 text-white text-lg">
          Already have an account?{" "}
          <a href="/login" className="text-white/90 font-semibold hover:underline">
            Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
