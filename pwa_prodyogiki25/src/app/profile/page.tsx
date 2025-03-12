"use client";
import Burger from '../home/components/hamburger';
import Link from 'next/link';
import React from 'react';
import { useState , useEffect } from 'react';
import Image from 'next/image';
import { MdKeyboardArrowRight } from "react-icons/md";
import Display from '../componenets/eventdisplay';

const Profile = () => {

  const profileImages = ["/p1.svg", "/p2.svg", "/p3.svg", "/p4.svg", "/p5.svg"];
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    // Check if a profile image is already stored
    const storedImage = localStorage.getItem("profileImg");
    if (storedImage) {
      setProfileImg(storedImage);
    } else {
      // Select a random image and store it
      const randomImg = profileImages[Math.floor(Math.random() * profileImages.length)];
      localStorage.setItem("profileImg", randomImg);
      setProfileImg(randomImg);
    }
  }, []);

const events= [
  {
    id: 1,
    img: "/image77.jpg",
    text:"mousetrap"
   },
   {
    id: 2,
    img: "/image77.jpg",
    text:"Abhedya 4.0"
   },
   {
    id: 3,
    img: "/image77.jpg",
    text:"aeroquest"
   },
   {
    id: 4,
    img: "/image77.jpg",
    text:"CSE Event"
   },
];


  return (
    <div
      className="flex flex-col items-center h-screen bg-cover bg-center bg-no-repeat min-w-screen"
       style={{
        backgroundImage: `url('/background.png')`,
       }}
    >
      <Burger/>
      <div className="mt-20 participant_info font-inter flex flex-col text-white items-center justify-center">
        <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-b from-[#1B7774] to-[#0E1F25]">
          <div className="w-28 h-28 rounded-full overflow-hidden my-3 ">
            {profileImg && (
              <Image
                src={profileImg}
                alt="Profile Image"
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            )}
        
</div>
        </div>
        <div className='name text-lg mt-2 font-semibold text-white'>Amit Singh Bathyal</div>
        <div className='prodyid text-lg font-semibold py-3 text-white'>prody_id 011</div>
        <div className='points text-lg font-semibold text-white'>1000</div>
        <div className='points text-base font-medium mb-8 text-white'>Prody Points</div>
      </div>
      <Display/>
      {/* <CircularProgressBar events={eventNames.length} eventNames={eventNames}/> */}
      <div className='flex px-6 pt-7 pb-2 justify-between w-full'>
      <div className='text-white font-semibold text-lg'>More Events</div>
      <MdKeyboardArrowRight size={24} className='text-white'/>
      </div>
      <Link href="/events">        
<div className="grid grid-rows-2 grid-flow-col gap-4 bg-[##010101] p-4 w-full text-white ">
  {events.map((event) => (
    <div key={event.id} className="flex items-center mb-4 hover:scale-110 transition-all duration-300">
      
      
        <Image
              src={event.img}
              alt={event.text}
              width={64} 
              height={64} 
              className="rounded-full object-cover w-[14vw] translate-x-2"
            />
      <Image
      src="/Subtract.svg" 
  alt="Circular Image" 
  width={500} 
  height={500} 
  className="w-[30vw] relative" 
/>
      <div className='absolute translate-x-20 -translate-y-2 bg- px-2'>
        {event.text}
        
      </div>
    </div>
  ))}
</div>
</Link>

    </div>
  );
};

export default Profile;
