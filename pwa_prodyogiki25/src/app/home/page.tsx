"use client"
import React, { useState, useEffect } from 'react';
import Burger from './components/hamburger'; 
import Timeline from './components/timeline'; 
import Redirect from '@/app/home/components/redirect';
import Top from './components/top';
import Main from './components/main';
export default function Home() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBackground(true);
    }, 1500); 
  }, []);

  return (
    <>

      {!showBackground && (
        <Redirect/>
      )}

      {showBackground && (
        <div className="bg-black bg-cover bg-center relative min-h-screen font-light">
          <div className="absolute inset-0 top-28 bg-gradient-to-t h-[600px] from-transparent via-[#59F7E2] to-transparent opacity-40 blur-xl z-0"></div>
            <Top/>
            <Main/>
            <Burger />
          <Timeline />
        </div>
      )}
    </>
  );
}
