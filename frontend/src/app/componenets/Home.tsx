"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Countdown from "./Countdown";
import { useRouter } from "next/navigation";



// const sponsors = [
//   { type: "Title Sponsor", name: "Company A", description: "Leading industry giant.", image: "/images/bgnew5.png" },
//   { type: "Gold Sponsor", name: "Company B", description: "Innovators in tech.", image: "/images/bgnew5.png" },
//   { type: "Silver Sponsor", name: "Company C", description: "Revolutionizing AI.", image: "/images/bgnew5.png" },
//   { type: "Bronze Sponsor", name: "Company D", description: "Your trusted partner.", image: "/images/bgnew5.png" },
//   { type: "Silver Sponsor", name: "Company C", description: "Revolutionizing AI.", image: "/images/bgnew5.png" },
//   { type: "Bronze Sponsor", name: "Company D", description: "Your trusted partner.", image: "/images/bgnew5.png" },

// ];


export default function Home() {
  const [displayedText, setDisplayedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    setIsLoggedIn(!!jwt);
  }, []);


    const handleLogout = () => {
      localStorage.removeItem("jwt"); 
      router.push("/login"); 
    };



  useEffect(() => {
    const texts = ["REALMS OF ENGINEERING MARVELS", "WHERE ENGINEERING MEETS INNOVATION"]; 
    const currentText = texts[textIndex];

    if (!isDeleting && charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + currentText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100); 

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
    <div className="relative flex justify-center  text-white text-2xl ml-16 mt-16 font-bold w-[100vw] h-[200vh]" style={{ gridRow: "span 2" }}>
      <div className="absolute top-56 left-56 flex flex-col items-start">
        <div className="text-2xl border-2 border-white w-60 h-16 pt-3 rounded-2xl text-center">Total Events</div>
        <Countdown />
      </div>
      <div className=" flex items-end">
        <div className="absolute top-44 right-40 h-24 w-72 flex items-center justify-center rounded-2xl border-2 border-white p-2 text-white text-[20px] font-bold shadow-lg text-center">
          REGISTER NOW FOR EXISTING EVENTS !!
        </div>
        {isLoggedIn ? (

            <button onClick={handleLogout}
            className="absolute top-80 right-20 -translate-x-7 w-56 h-16 flex items-center justify-center rounded-2xl border-[1px] border-white p-2 text-white text-[24px] hover:bg-teal-400 hover:scale-105 transition-transform duration-300 shadow-lg text-center">Logout</button>

        ) : (
          
          <button
          onClick={() => window.location.href = '/signup'} 
          className="absolute top-80 right-20 -translate-x-7 w-56 h-16 flex items-center justify-center rounded-2xl border-[1px] border-white p-2 text-white text-[24px] hover:bg-teal-400 hover:scale-105 transition-transform duration-300 shadow-lg text-center"
        >
          
          SIGN UP
        </button>


        )}


      </div>

      <div className="absolute w-[50vw]  flex flex-col items-center  justify-center">
        <Image 
          className="p-4 m-4"
          src="/images/bgnew51.webp"
          alt="Prodyogiki Logo"
          width={2000}
          height={1600}
        />
        <div className="m-2 text-bold text-7xl">PRODYOGIKI</div>
        <div className="m-2 font-bold text-3xl ">
 4<sup>th</sup> - 6<sup>th</sup> April, 2025
</div>
        <div className="m-2">{displayedText}<span className="animate-blink">|</span></div>

        {/* <div className="grid grid-cols-3 grid-rows-1 gap-8 p-8 mt-20 bg-black">
      {sponsors.map((sponsor, index) => (
        <div key={index} className="flex flex-col justify-center p-4  rounded-lg shadow-lg">
          <h3 className="text-lg font-bold text-white">{sponsor.type}</h3>
          <div className="w-full h-[2px] bg-gray-400"></div>
          <p className="text-white text-center text-sm mb-2">{sponsor.description}</p>
       
          <Image src={sponsor.image} alt={sponsor.name} width={150} height={100} className="rounded-md object-contain " />
      
        </div>
      ))}
    </div> */}

    <div className="mt-12 ">
      <div className="text-4xl border-2 border-white p-4 px-8  rounded-2xl ">ABOUT PRODYOGIKI</div>

    </div>
    <div className="mt-12  font-thin text-2xl">Prodyogiki, an exciting event hosted by ISTE NIT Hamirpur, brings together technology and engineering enthusiasts to showcase their skills and apply their knowledge practically. The event features interactive sessions, workshops, events, quizzes, and more. At ISTE NIT Hamirpur, we are committed to fostering a culture of technological advancement. Prodyogiki unites various engineering and technical disciplines, setting new standards of excellence at NIT Hamirpur.</div>

      </div>






    </div>
  );
}
