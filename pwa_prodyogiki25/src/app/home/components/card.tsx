import { useState, useEffect } from "react";
import Image from "next/image";
export default function Card1() {
  const list: {title: string; img: string; price: string;}[] = [
    {
      title: "Orange",
      img: "/images/events.png",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img:"/images/workshop.png",
      price: "$3.00",
    },
    {
      title: "Orange",
      img: "/images/events.png",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img:"/images/workshop.png",
      price: "$3.00",
    },
    {
      title: "Orange",
      img: "/images/events.png",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img:"/images/workshop.png",
      price: "$3.00",
    },
    {
      title: "Orange",
      img: "/images/events.png",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img:"/images/workshop.png",
      price: "$3.00",
    },
  ];


  const [movingIndex, setMovingIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setMovingIndex((prevIndex) => (prevIndex + 1) % list.length); 
    }, 3000); 

    return () => clearInterval(interval);
  }, [list.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-1000"
        style={{
          transform: `translateX(-${movingIndex * (100 / 2)}%)`, 
        }}
      >
        {list.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-8/12 p-2">
            <div className="bg-white  shadow-lg overflow-hidden rounded-3xl">
              <div className="relative">
                <Image
                width={149}
                  height={149}
              
                  src={item.img}
                  alt={item.title}
                  className="w-full h-[190px] object-cover "
         
                />
               
              </div>
        
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
