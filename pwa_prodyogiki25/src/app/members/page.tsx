"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Burger from "../home/components/hamburger";



type Member = {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  image: string;
  bitemoji: string;
  team_type: string;
};

type TeamSection = {
  id: string;
  label: string;
  data: Member[];
};

type MemberCardProps = {
  member: Member;
};

const fetchTeamSections = async (): Promise<TeamSection[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contactus/`);
    if (!response.ok) {
      throw new Error("Failed to fetch team sections");
    }
    const members: Member[] = await response.json();

    const teamSections: TeamSection[] = [
      {
        id: "core-team",
        label: "Core Team",
        data: members.filter((member) => member.team_type === "CORE"),
      },
      {
        id: "design-team",
        label: "Design Team",
        data: members.filter((member) => member.team_type === "DESIGN"),
      },
      {
        id: "tech-team",
        label: "Tech Team",
        data: members.filter((member) => member.team_type === "TECH"),
      },
      {
        id: "finance-team",
        label: "Finance Team",
        data: members.filter((member) => member.team_type === "FINANCE"),
      },
      {
        id: "pr-team",
        label: "PR Team",
        data: members.filter((member) => member.team_type === "PR"),
      },
    ];

    return teamSections;
  } catch (error) {
    console.error("Error fetching team sections:", error);
    return [];
  }
};

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
      className="h-[500px] mb-8 mx-auto "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div
        className="w-[90vw] h-[400px]  border-t-4 border-b-2 border-x-2  border-[#008080] rounded-xl"
        onClick={handleCardClick}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s",
        }}
      >

        <motion.div
          className=" h-full absolute inset-0 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          {member.bitemoji ? (
            <Image
              width={400}
              height={400}
              className="w-full h-full p-4 rounded-md object-cover object-center"
              src={member.bitemoji}
              alt={`${member.name}'s bitmoji`}
            />
          ) : (
            <div className="w-[320px] h-[300px]  rounded-md bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Bitmoji</span>
            </div>
          )}
        </motion.div>

        <motion.div
          className="w-full h-full absolute inset-0 flex flex-col items-center justify-center"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
          }}
        >
          {member.image ? (
            <Image
              width={400}
              height={400}
              className="w-full h-full p-4 rounded-md object-cover object-center"
              src={member.image}
              alt={`${member.name}'s original`}
            />
          ) : (
            <div className="w-[320px] h-[300px] mx-auto rounded-md bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </motion.div>
      </div>
      <div className="flex flex-col justify-center text-white mt-4">
        <div className="text-center">{member.name}</div>
        <div className="text-center">{member.position}</div>
        <div className="flex justify-center space-x-4 mt-2">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="text-white hover:text-[#008080] transition-colors"
              title="Send Email"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="text-white hover:text-[#008080] transition-colors"
              title="Make Call"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Members  = () => {
  const [teamSections, setTeamSections] = useState<TeamSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamSections = async () => {
      try {
        const sections = await fetchTeamSections();
        console.log("Fetched team sections:", sections); // Debug the response
        setTeamSections(sections);
      } catch (error) {
        console.error("Error loading team sections:", error);
      } finally {
        setLoading(false);
      }
    };
    loadTeamSections();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Burger/>
    <div>

      <div className="flex pt-20 space-x-6 mx-2 overflow-x-auto whitespace-nowrap">
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
            <div className="text-white text-center pt-4 font-bold">{section.label}</div>
          </motion.div>
        ))}
      </div>

      {teamSections.map((section) => (
        <div key={section.id} id={section.id}  className="py-16 ">
          <div className="flex flex-row justify-center text-[30px]  pt-0 pb-8 items-center text-white text-opacity-80 font-bold">
            {section.label}
          </div>
          <div className="flex flex-wrap justify-center">
            {(section.data || []).map((member, index) => (
              <MemberCard key={index} member={member} />
            ))}
          </div>
        </div>
      ))}
</div>
    </div>
  );
};

export default Members;