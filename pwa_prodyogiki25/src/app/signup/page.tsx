"use client";
import React, { useState } from "react";
import Image from "next/image";

const SignupPage: React.FC = () => {
  // State to store input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form Data:", formData); // Replace this with backend API call later
  };

  return (
    <div className="bg-black min-h-screen flex flex-col pt-5 items-center sm:pt-32 relative">
      
      {/* Sign Up & Logo (Outside the Border) */}
      <div className="flex items-center justify-between w-[90%] max-w-[400px] sm:mb-12 mb-6">
        <h2 className="text-white text-4xl sm:text-4xl font-black">Sign Up</h2>
        <Image src="/images/logo.png" alt="Logo" width={60} height={50} />
      </div>

      {/* Signup Form */}
      <div className="p-4 mx-2 sm:border-[2px] border-[#1B7774] w-[90%] max-w-[400px] bg-black rounded-3xl h-auto flex flex-col justify-center items-center">
        
        {["name", "email", "password"].map((field, index) => (
          <div key={index} className="w-full max-w-[350px] mb-11 sm:mb-9">
            <label
              htmlFor={field}
              className="block text-[#B0B0B0] font-semibold sm:font-bold text-lg sm:text-xl mb-2"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <div className="relative h-[60px] sm:h-[70px]">
              <input
                type={field === "password" ? "password" : "text"}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]} // Bind state
                onChange={handleChange} // Capture input
                className="mt-2 p-2 pl-4 sm:pl-6 border-b-[1px] border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl w-full h-full placeholder-white"
                placeholder={`Enter your ${field}`}
              />
            </div>
          </div>
        ))}

        {/* Sign Up Button */}
        <button
          onClick={handleSubmit} // Trigger data collection
          className="mt-6 px-5 border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl h-16 w-44"
        >
          Sign Up
        </button>

        {/* Already have an account? */}
        <div className="mt-6 text-white text-base">
          Already have an account?{" "}
          <a href="/login" className="text-[#1B7774] font-semibold hover:underline">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
