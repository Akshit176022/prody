"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Burger from "../home/components/hamburger";
import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Event = {
  id: number;
  name: string;
  description: string;
  poster: string;
  is_live: boolean;
  is_completed: boolean;
  is_team_event: boolean;
  registered_users: number[];
  registered_teams: number[];
};

type User = {
  username: string;
  user_id: string;
  prody_points: number;
  registered_events: {
    is_live_events: Event[];
    is_upcoming_events: Event[];
    is_completed_events: Event[];
  };
};

const Profile = () => {
  const profileImages = useMemo(() => ["/p1.svg", "/p2.svg", "/p3.svg", "/p4.svg", "/p5.svg"], []);
  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [moreEvents, setMoreEvents] = useState<Event[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingMoreEvents, setIsLoadingMoreEvents] = useState(false);
  const [errorMoreEvents, setErrorMoreEvents] = useState<unknown>(null);
  const [errorUser, setErrorUser] = useState<unknown>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    setToken(storedToken);
    console.log("Token retrieved from localStorage:", storedToken);

    if (!storedToken) {
      console.error("No token found. Please log in.");
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user/`,
          {
            headers: {
              Authorization: `${storedToken}`,
            },
          }
        );
        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setErrorUser(error);
      }
    };

    const fetchMoreEvents = async () => {
      setIsLoadingMoreEvents(true);
      setErrorMoreEvents(null);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`
        );
        setMoreEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch more events:", error);
        setErrorMoreEvents(error);
      } finally {
        setIsLoadingMoreEvents(false);
      }
    };

    const storedImage = localStorage.getItem("profileImg");
    if (storedImage) {
      setProfileImg(storedImage);
    } else {
      const randomImg =
        profileImages[Math.floor(Math.random() * profileImages.length)];
      localStorage.setItem("profileImg", randomImg);
      setProfileImg(randomImg);
    }

    fetchUserProfile();
    fetchMoreEvents();
  }, []);

  if (errorUser) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Failed to load profile. Please try again later.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  const { is_live_events = [], is_upcoming_events = [], is_completed_events = [] } =
    user.registered_events || {};

  return (
    <div
      className="flex flex-col items-center h-screen bg-cover bg-center bg-no-repeat min-w-screen"
     
    >
      <Burger />
      <div className="mt-20 participant_info font-inter flex flex-col text-white items-center justify-center">
        <div className="relative flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-b from-[#1B7774] to-[#0E1F25]">
          <div className="w-28 h-28 rounded-full overflow-hidden my-3">
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
        <div className="name text-lg mt-2 font-semibold text-white">{user.username}</div>
        <div className="prodyid text-lg font-semibold py-3 text-white">Prody ID: {user.user_id}</div>
        <div className="points text-lg font-semibold text-white">{user.prody_points}</div>
        <div className="points text-base font-medium mb-8 text-white">Prody Points</div>
      </div>

      <div className="w-full px-6 pb-2 mt-12">
        <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl text-center">
          Registered Events
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
><div className="w-full px-6 pb-2 mt-12">
  <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl text-center">
    Registered Events
  </div>
  <Swiper
    modules={[Pagination]} // Removed Navigation module
    spaceBetween={20}
    slidesPerView={1}
    pagination={{ clickable: true }} // Keep pagination
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="w-full"
  >
    {/* Live Events */}
    {is_live_events.map((event) => (
      <SwiperSlide key={event.id}>
        <div
          className="relative flex flex-col items-center justify-center h-[300px] bg-teal-800 bg-opacity-20 backdrop-blur-md rounded-lg p-4 shadow-lg border border-teal-500"
        >
          <div className="text-center mt-2 p-4">
            <p className="font-semibold text-2xl text-white">{event.name}</p>
            <p className="text-1xl text-[#FFD700]">Status: Live</p>
            <p className="text-1xl text-teal-200">
              {event.is_team_event ? "Team Event" : "Individual Event"}
            </p>
            <p className="font-semibold text-lg text-teal-100">{event.description}</p>
            {event.is_team_event && (
              <div className="text-sm mt-2 text-teal-200">
                <p>Teams Registered:</p>
                {event.registered_teams.map((team_id) => (
                  <p key={team_id}>Team ID: {team_id}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </SwiperSlide>
    ))}

    {/* Upcoming Events */}
    {is_upcoming_events.map((event) => (
      <SwiperSlide key={event.id}>
        <div
          className="relative flex flex-col items-center justify-center h-[300px] bg-teal-800 bg-opacity-20 backdrop-blur-md rounded-lg p-4 shadow-lg border border-teal-500"
        >
          <div className="text-center mt-2 p-4">
            <p className="font-semibold text-lg text-white">{event.name}</p>
            <p className="text-sm text-teal-300">Status: Upcoming</p>
            <p className="text-sm text-teal-200">
              {event.is_team_event ? "Team Event" : "Individual Event"}
            </p>
            <p className="font-semibold text-lg text-teal-100">{event.description}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}

    {/* Completed Events */}
    {is_completed_events.map((event) => (
      <SwiperSlide key={event.id}>
        <div
          className="relative flex flex-col items-center justify-center h-[300px] bg-teal-800 bg-opacity-20 backdrop-blur-md rounded-lg p-4 shadow-lg border border-teal-500"
        >
          <div className="text-center mt-2 p-4">
            <p className="font-semibold text-lg text-white">{event.name}</p>
            <p className="text-sm text-[#FF6347]">Status: Completed</p>
            <p className="text-sm text-teal-200">
              {event.is_team_event ? "Team Event" : "Individual Event"}
            </p>
            <p className="font-semibold text-lg text-teal-100">{event.description}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
        </Swiper>
      </div>


      <div className="flex px-6 pt-7 pb-2 justify-between w-full">
        <div className="text-white font-semibold text-lg">
          <Link href="/events">More Events</Link>
        </div>
        <Link href="/events">
          <MdKeyboardArrowRight size={24} className="text-white" />
        </Link>
      </div>

      {isLoadingMoreEvents ? (
        <div className="text-white">Loading more events...</div>
      ) : errorMoreEvents ? (
        <div className="text-red-500">Failed to load more events.</div>
      ) : (
        <Link href="/events">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 w-full text-white">
          {moreEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center mb-4 hover:scale-110 transition-all duration-300"
            >
              <Image
                src={event.poster}
                alt={event.name}
                width={64}
                height={64}
                className="rounded-full object-cover w-[14vw] translate-x-2"
              />
              <Image
                src="/Subtract.svg"
                alt="Decoration"
                width={500}
                height={500}
                className="w-[30vw] relative"
              />
              <div className="absolute translate-x-20 -translate-y-2 bg- px-2">
                {event.name}
              </div>
            </div>
          ))}
        </div>
      </Link>
      )}
    </div>
  );
};

export default Profile;