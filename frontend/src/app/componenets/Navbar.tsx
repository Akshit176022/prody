"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const navItems = [
  { name: "Home", path: "/home" },
  { name: "Events", path: "/events" },
  { name: "Workshop", path: "/workshop" },
  { name: "Members", path: "/members" },
  { name: "Profile", path: "/profile" },
  { name: "Login", path: "/login" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50  w-full flex justify-between items-center px-40  text-white  
      border-b-[1px] border-gray-300/30 shadow-lg shadow-gray-900/10 backdrop-blur-sm">
      
      <div className="flex items-center">
        <Image
          src="/images/logo.png"
          alt="MyBrand Logo"
          width={120}
          height={50}
          className="cursor-pointer w-[3vw]"
        />
        <div className="text-3xl font-semibold pl-4">PRODYOGIKI</div>
      </div>

      
      <ul className="flex space-x-8 text-xl">
        {navItems.map((item, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1, color: "#26e9e3" }}
            transition={{ duration: 0.2 }}
          >
            <Link href={item.path}>{item.name}</Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
