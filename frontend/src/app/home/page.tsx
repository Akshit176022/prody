"use client";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Home from "../componenets/Home";
import Members from "../componenets/Members";
import Register from "../componenets/Profile";
import Events from "../componenets/Events";
import Gallery from "../componenets/Workshop";
import Messages from "../componenets/Messages";
import Timeline from "../componenets/Timeline";

gsap.registerPlugin(ScrollToPlugin);

const MouseScrollGrids = () => {
  const cursorX = useRef(0);
  const cursorY = useRef(0);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const gridRef = useRef(null);
  const pathname = usePathname();
  const [isScaled, setIsScaled] = useState(false);
  const [isScrollActive, setIsScrollActive] = useState(true);
  const animationFrameRef = useRef<number | null>(null);

  useLayoutEffect(() => {
    console.log("Resetting Scroll Position on Route Change:", pathname);
    window.scrollTo(0, 0); 
    gsap.to(window, { duration: 0, scrollTo: { x: 0, y: 0 } }); 
  }, [pathname]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isScrollActive) {
        cursorX.current = event.clientX / window.innerWidth;
        cursorY.current = event.clientY / window.innerHeight;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isScrollActive]);

  useEffect(() => {
    const smoothScroll = () => {
      if (isScrollActive) {
        targetX.current += (cursorX.current - targetX.current) * 0.1;
        targetY.current += (cursorY.current - targetY.current) * 0.1;

        const scrollWidth = document.documentElement.scrollWidth - window.innerWidth;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;

        gsap.to(window, {
          duration: 1.5,
          ease: "power2.out",
          scrollTo: {
            x: targetX.current * scrollWidth,
            y: targetY.current * scrollHeight,
            autoKill: false,
          },
        });
      }

      animationFrameRef.current = requestAnimationFrame(smoothScroll);
    };

    animationFrameRef.current = requestAnimationFrame(smoothScroll);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isScrollActive]);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline.fromTo(
      gridRef.current,
      { scale: 0.5, x: "0", y: "0" },
      {
        scale: 1,
        x: "-28%",
        y: "0%",
        duration: 2,
        delay: 1,
        ease: "power2.out",
      }
    );

    timeline.to(
      gridRef.current,
      {
        scale: 1,
        x: "0%",
        y: "0%",
        duration: 2,
        ease: "power2.inOut",
      },
      "+=0.5"
    );
  }, []);

  const toggleScale = () => {
    if (isScaled) {
      // First enable mouse scrolling, then scale up to 1
      setIsScrollActive(true);
      gsap.to(gridRef.current, {
        scale: 1,
        duration: 1.5,
        x: "0%",
        y: "0%",
        ease: "power2.out"
      });
    } else {
      // First disable mouse scrolling, then scale down to 0.5
      setIsScrollActive(false);
      gsap.to(gridRef.current, {
        scale: 0.5,
        duration: 1.5,
        ease: "power2.out",
      });
    }
    setIsScaled(!isScaled); 
  };

  // Add an effect to disable scrolling when scaled up
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrollActive) {
        window.scrollTo(0, 0);
      }
    };

    // Add additional body style to prevent scrolling when scaled up
    if (!isScrollActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "";
    };
  }, [isScrollActive]);

  return (
    <div className='scrollbar-hide'>
      <button
        onClick={toggleScale}
        className="fixed right-[46%] top-[1%] z-50 px-6 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-all"
      >
        {isScaled ? "Scale Up" : "Scale Down"}
      </button>

      <div
        ref={gridRef}
        className="grid md:grid-cols-3 md:grid-rows-3 grid-cols-1 grid-rows-1 overflow-hidden bg-black transform origin-top-left"
        style={{
          width: "210vw",
          height: "230vh",
          display: "grid",
          gridTemplateColumns: "50vw  100vw 50vw",
          gridTemplateRows: "80vh  80vh  80vh",
          gap: "5px",
        }}
      >
        <Members />
        <Home />
        <Events />
        <Register />
        <Gallery />
        <Messages />
        <Timeline />
        <div className="w-[50vw] h-[50vh]">example</div>
      </div>
    </div>
  );
};

export default MouseScrollGrids;