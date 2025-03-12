"use client";
import React, { useState } from "react";
import Burger from "../home/components/hamburger";
import Image from "next/image";
import { motion } from "framer-motion";
import { MemberCardProps } from "@/lib/type";
import { teamSections } from "@/lib/constants";

const getIcon = (sectionId: string) => {
  switch (sectionId) {
    case "core-team":
      return "👥";
    case "design-team":
      return "🖌️";
    case "tech-team":
      return "💻";
    case "finance-team":
      return "💰";
    case "pr-team":
      return "📢";
    default:
      return "";
  }
};

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <motion.div
      className="h-[230px] mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="w-[153px] h-[160px] bg-black border-t-4 border-b-2 border-x-2 border-[#008080] rounded-xl"
        onClick={handleCardClick}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >

        <motion.div
          className="w-full h-full absolute inset-0 flex flex-col items-center justify-center backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            width={400}
            height={400}
            className="w-[100px] h-[153px] mx-auto rounded-md"
            src={member.bitmoji}
            alt={`${member.name}'s bitmoji`}
          />
        </motion.div>


        <motion.div
          className="w-full h-full absolute inset-0 flex flex-col items-center justify-center backface-hidden"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          <Image
            width={400}
            height={400}
            className="w-[100px] h-[153px] mx-auto rounded-md"
            src={member.image}
            alt={`${member.name}'s original`}
          />
        </motion.div>
      </div>
      <div className="flex flex-col justify-center text-white mt-4">
        <div className="text-center">{member.name}</div>
        <div className="text-center">{member.role}</div>
      </div>
    </motion.div>
  );
};

const Members: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black h-screen bg-repeat-y">
      <Burger />

      <div className="flex pt-24 pl-4 justify-start items-center space-x-6 overflow-x-auto whitespace-nowrap">
        {teamSections.map((section) => (
          <motion.div
            key={section.id}
            className="flex flex-col cursor-pointer transition-transform duration-300 transform hover:scale-110 hover:bg-opacity-40 hover:rounded-xl p-2"
            onClick={() => scrollToSection(section.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <span className="text-xl text-black">{getIcon(section.id)}</span>
            </div>
            <div className="text-white text-center pt-1">{section.label}</div>
          </motion.div>
        ))}
      </div>

      {teamSections.map((section) => (
        <div key={section.id} id={section.id} className="py-16">
          <div className="flex flex-row justify-center text-[24px] pt-0 pb-8 items-center text-white text-opacity-80">
            {section.label}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {section.data.map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Members;
