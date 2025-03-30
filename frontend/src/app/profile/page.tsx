"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";
import axios from "axios";

type TeamEventMapping = {
  event: {
    id: number;
    name: string;
    abstract_link: string;
    is_team_event: boolean;
    max_members: number;
  };
  team: {
    id: string;
    name: string;
  };
};

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
  registered_events: Event[];
  team_event_mapping: TeamEventMapping[];
  roll_no: string;
  branch: string;
  is_verified: boolean;
};

const Profile = () => {
  const router = useRouter(); 
  const profileImages = useMemo(() => ["/p1.svg", "/p2.svg", "/p3.svg", "/p4.svg", "/p5.svg"], []);

  const [profileImg, setProfileImg] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [moreEvents, setMoreEvents] = useState<Event[]>([]);
  const [isLoadingMoreEvents, setIsLoadingMoreEvents] = useState(false);
  const [errorMoreEvents, setErrorMoreEvents] = useState<unknown>(null);
  const [errorUser, setErrorUser] = useState<unknown>(null);
  const [showLoginMessage, setShowLoginMessage] = useState(false); 

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (!storedToken) {
      setShowLoginMessage(true);

      setTimeout(() => {
        router.push("/login");
      }, 3000); 
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

    fetchUserProfile();
    fetchMoreEvents();
  }, [router]); 

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImg");
    if (storedImage) {
      setProfileImg(storedImage);
    } else {
      const randomImg = profileImages[Math.floor(Math.random() * profileImages.length)];
      localStorage.setItem("profileImg", randomImg);
      setProfileImg(randomImg);
    }
  }, [profileImages]);

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

  return (
    <div className="flex flex-col items-center">

      {showLoginMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-gray-800">
              You must be logged in to access this page.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Redirecting to the login page...
            </p>
          </div>
        </div>
      )}

      <Navbar />

      <div className="mt-28 participant_info font-inter flex flex-col text-white items-center justify-center">
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
        <div className="name text-2xl mt-2 font-semibold text-white">
          {user.username}
        </div>
        <div className="prodyid text-xl font-semibold py-4 text-white">
          Prody ID: {user.user_id}
        </div>
        <div className="points text-lg font-medium mb-12 text-white">
          Prody Points: {user.prody_points}
        </div>
        <div
      onClick={() => (window.location.href = "https://chat.whatsapp.com/L9oRQK10eGL25CSGI6wZQK")}
      className="bg-teal-500 text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-md cursor-pointer hover:bg-teal-600 active:bg-teal-700 transition duration-300"
    >
      Join WhatsApp Community
    </div>
      </div>

      <div className="w-full px-6 pb-2 mt-12">
        <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl text-center">
          Registered Events
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {user.team_event_mapping.map((mapping, index) => (
            <div
              key={index}
              className="flex flex-col items-center hover:scale-105 transition-all duration-300 mb-8 bg-teal-800/20 backdrop-blur-md border border-teal-500/30 rounded-lg p-4 shadow-lg"
            >
              <div className="text-center mt-2">
                <p className="font-semibold text-2xl text-white">{mapping.event.name}</p>

                <p className="text-1xl text-teal-200">
                  {mapping.event.is_team_event ? "Team Event" : "Individual Event"}
                </p>

                {mapping.event.is_team_event && (
                  <p className="text-sm text-gray-300">Team Name: {mapping.team.name}</p>
                )}
                {mapping.event.is_team_event && (
                  <p className="text-sm text-gray-300">Team Id: {mapping.team.id}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex px-6 pb-2 mt-12 justify-between w-full">
        <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl">
         All Events
        </div>
      </div>

      {isLoadingMoreEvents ? (
        <div className="text-white">Loading more events...</div>
      ) : errorMoreEvents ? (
        <div className="text-red-500">Failed to load more events.</div>
      ) : (
        <div className="grid grid-cols-4 gap-20 p-4 w-3/4 text-white">
          {moreEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="flex items-center hover:scale-110 transition-all duration-300 mb-32">
                <Image
                  src={event.poster}
                  alt={event.name}
                  width={200}
                  height={200}
                  className="rounded-full object-cover w-20 h-20 translate-x-2"
                />
                <Image
                  src="/Subtract.svg"
                  alt="Decoration"
                  width={500}
                  height={500}
                  className="w-44 relative"
                />
                <div className="flex absolute translate-x-32">{event.name}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;