"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "./Countdown";


const sponsors = [
  { type: "Title Sponsor", name: "Company A", description: "Leading industry giant.", image: "/images/bgnew5.png" },
  { type: "Gold Sponsor", name: "Company B", description: "Innovators in tech.", image: "/images/bgnew5.png" },
  { type: "Silver Sponsor", name: "Company C", description: "Revolutionizing AI.", image: "/images/bgnew5.png" },
  { type: "Bronze Sponsor", name: "Company D", description: "Your trusted partner.", image: "/images/bgnew5.png" },
];


export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);



  useEffect(() => {
    const texts = ["REALMS OF ENGINEERING", "WHERE ENGINEERING MEETS INNOVATION"]; 
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100); // Typing speed

      return () => clearTimeout(timeout);
    }

    if (charIndex === currentText.length) {
      setTimeout(() => setIsDeleting(true), 1000);
    }

    if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, 50); 

      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }
  }, [charIndex, isDeleting, textIndex]); 
  return (
    <div className="relative flex justify-center  text-white text-2xl ml-16 mt-10 font-bold w-[100vw] h-[150vh]" style={{ gridRow: "span 2" }}>
      <div className="absolute top-56 left-56 flex flex-col items-start">
        <div className="text-2xl border-2 border-white w-60 h-16 pt-3 rounded-2xl text-center">Total Events</div>
        <Countdown />
      </div>
      <div className=" flex items-end">
        <div className="absolute top-44 right-40 h-24 w-72 flex items-center justify-center rounded-2xl border-2 border-white p-2 text-white text-[20px] font-bold shadow-lg text-center">
          REGISTER NOW FOR EXISTING EVENTS !!
        </div>

        <div className=" absolute top-80 right-20 -translate-x-7 hover:bg-transparent w-56 h-16 flex items-center justify-center rounded-2xl border-[1px] border-white p-2 text-white text-[24px]  shadow-lg text-center">
          <a href="/signup">SIGN UP</a>
        </div>
      </div>

      <div className="absolute flex flex-col items-center  justify-center">
        <Image 
          className="p-4 m-4"
          src="/images/bgnew5.png"
          alt="Prodyogiki Logo"
          width={800}
          height={400}
        />
        <div className="m-2 font-heading text-7xl">PRODYOGIKI</div>
        <div className="m-2">{displayedText}<span className="animate-blink">|</span></div>

        <div className="grid grid-cols-4 grid-rows-1 gap-8 p-8 mt-8 bg-black">
      {sponsors.map((sponsor, index) => (
        <div key={index} className="flex flex-col justify-center p-4  rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white">{sponsor.type}</h3>
          <div className="w-full h-[2px] bg-gray-400"></div>
          <p className="text-white text-center text-sm mb-2">{sponsor.description}</p>
       
          <Image src={sponsor.image} alt={sponsor.name} width={150} height={100} className="rounded-md object-contain " />
      
        </div>
      ))}
    </div>
      </div>



    </div>
  );
}
