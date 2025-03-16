"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
  password: string;
  branch: string;
  roll_no: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    branch: "",
    roll_no: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const branches = [
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics And Communication Engineering",
    "ECE Dual",
    "Chemical Engineering",
    "Computer Science Engineering",
    "CSE Dual",
    "Material Science",
    "Engineering Physics",
    "Mathematics And Computing",
    "Other",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${backendUrl}/api/auth/register/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage("User registered successfully!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex flex-col pt-5 items-center sm:pt-32 relative">
      {/* Sign Up & Logo (Outside the Border) */}
      <div className="flex items-center justify-between w-[90%] max-w-[400px] sm:mb-12 mb-6">
        <h2 className="text-white text-4xl sm:text-4xl font-black">Sign Up</h2>
        <Image src="/images/logo.png" alt="Logo" width={60} height={50} />
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-500 text-white rounded-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Signup Form */}
      <motion.div
        className="p-4 mx-2 sm:border-[2px] border-[#1B7774] w-[90%] max-w-[400px] bg-black/30 backdrop-blur-md rounded-3xl h-auto flex flex-col justify-center items-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <form onSubmit={handleSubmit} className="w-full">
          {["username", "email", "password", "branch", "roll_no"].map((field, index) => (
            <div key={index} className="w-full max-w-[350px] mb-11 sm:mb-9">
              <label
                htmlFor={field}
                className="block text-[#B0B0B0] font-semibold sm:font-bold text-lg sm:text-xl mb-2"
              >
                {field === "username" ? "Username" : field === "roll_no" ? "Roll No" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className="relative h-[60px] sm:h-[70px]">
                {field === "branch" ? (
                  <select
                    id={field}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    className="mt-2 p-2 pl-4 sm:pl-6 border-b-[1px] border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl w-full h-full placeholder-white"
                  >
                    <option value="">Choose Your Branch</option>
                    {branches.map((branch, index) => (
                      <option key={index} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field === "password" ? "password" : "text"}
                    id={field}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    className="mt-2 p-2 pl-4 sm:pl-6 border-b-[1px] border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl w-full h-full placeholder-white"
                    placeholder={`Enter your ${field === "username" ? "username" : field === "roll_no" ? "roll number" : field}`}
                  />
                )}
              </div>
            </div>
          ))}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="mt-6 px-5 border-[3px] border-[#1B7774] bg-[#171717] text-white rounded-2xl h-16 w-44 hover:scale-105 transition delay-100 duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        {/* Already have an account? */}
        <div className="mt-6 text-white text-base">
          Already have an account?{" "}
          <a href="/login" className="text-[#1B7774] font-semibold hover:underline">
            Log in
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;