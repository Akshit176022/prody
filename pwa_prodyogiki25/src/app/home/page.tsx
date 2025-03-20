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
        <div className="bg-cover bg-center relative min-h-screen font-light">
            <Top/>
            <Main/>
            <Burger />
          <Timeline />
        </div>
      )}
    </>
  );
}
