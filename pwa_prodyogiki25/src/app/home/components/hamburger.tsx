"use client";
import Link from "next/link";
import { useState, useEffect } from "react"; // Import useEffect
import { useRouter } from "next/navigation"; // Import useRouter
import { links,legalLinks } from "../../../lib/constants";

export default function Burger() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("jwt"); 
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    // Perform logout actions
    localStorage.removeItem("jwt");
    sessionStorage.removeItem("userSession");
    setIsLoggedIn(false);
    router.push("/login"); 
  };

  const filteredLinks = links.filter((link) => {
    if (link.name === "Login") {
      return !isLoggedIn; 
    }
    return true; 
  });

  return (
    <>
      <div
        className="absolute top-8 right-8 cursor-pointer z-[500]"
        onClick={toggleMenu}
      >
        <div
          className={`w-[21px] h-[2px] bg-white bg-opacity-80 mb-1 transition-transform duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-1" : ""
          }`}
        ></div>
        <div
          className={`w-[21px] h-[2px] bg-white bg-opacity-80 mb-1 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`w-[21px] h-[2px] bg-white bg-opacity-80 mb-1 transition-transform duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed top-2 right-0 w-full min-h-screen bg-black bg-opacity-50 backdrop-blur-lg
          flex flex-col pt-16 pl-8 z-[200] rounded-3xl border border-white border-opacity-20"
        >
          <ul className="text-white text-2xl space-y-6">
            {filteredLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-custom transition-all duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>


{isLoggedIn ? (

            <button onClick={handleLogout}>Logout</button>
        ) : (

            <Link href="/login" className="mt-4">Login</Link>


        )}
                    </li>

          </ul>
          {/* Legal Links */}
<div className="mt-12 border-t border-white/20 pt-6 text-white text-lg space-y-4">
  {legalLinks.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      onClick={toggleMenu}
      className="block hover:text-white transition"
    >
      {link.name}
    </Link>
  ))}
</div>

        </div>
      )}
    </>
  );
}