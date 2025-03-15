"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";
import axios from "axios";
import { any } from "three/tsl";

type Event = {
  id: number;
  name: string;
  description: string;
  poster: string;
  is_live: boolean;
  is_completed: boolean;
  is_team_event: boolean;
  registered_users: number[];
  registered_teams: number[]; // Only team IDs are provided
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
  // Memoize the profileImages array to prevent it from changing on every render
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
        setErrorUser(error );
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
    <div className="flex flex-col items-center ">
      <Navbar />

      {/* Profile Section */}
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
      </div>

      {/* Registered Events Section */}
      <div className="w-full px-6 pb-2 mt-12">
        <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl text-center">
          Registered Events
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {/* Live Events */}
          {is_live_events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col items-center hover:scale-105 transition-all duration-300 mb-8 bg-teal-600 min-h-[200px] rounded-lg p-4 shadow-lg"
            >
              <div className="text-center mt-2">
                <p className="font-semibold text-2xl">{event.name}</p>
                <p className="text-1xl text-[#FFD700]">Status: Live</p>
                <p className="text-1xl">
                  {event.is_team_event ? "Team Event" : "Individual Event"}
                </p>
                <p className="font-semibold text-lg">{event.description}</p>
                {event.is_team_event && (
                  <div className="text-sm mt-2">
                    <p>Teams Registered:</p>
                    {/* Debugging: Registered Teams: {event.registered_teams} */}
                    {event.registered_teams.map((team_id) => (
                      <p key={team_id}>Team ID: {team_id}</p> // Display team ID
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Upcoming Events */}
          {is_upcoming_events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col items-center hover:scale-105 transition-all duration-300 mb-8 bg-[#1B7774] rounded-lg p-4 shadow-lg"
            >
              <div className="text-center mt-2">
                <p className="font-semibold text-lg">{event.name}</p>
                <p className="text-sm text-[#00FF00]">Status: Upcoming</p>
                <p className="text-sm">
                  {event.is_team_event ? "Team Event" : "Individual Event"}
                </p>
                <p className="font-semibold text-lg">{event.description}</p>
              </div>
            </div>
          ))}

          {/* Completed Events */}
          {is_completed_events.map((event) => (
            <div
              key={event.id}
              className="flex flex-col items-center hover:scale-105 transition-all duration-300 mb-8 bg-[#1B7774] rounded-lg p-4 shadow-lg"
            >
              <div className="text-center mt-2">
                <p className="font-semibold text-lg">{event.name}</p>
                <p className="text-sm text-[#FF6347]">Status: Completed</p>
                <p className="text-sm">
                  {event.is_team_event ? "Team Event" : "Individual Event"}
                </p>
                <p className="font-semibold text-lg">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Events Section */}
      <div className="flex px-6 pb-2 mt-12 justify-between w-full">
        <div className="text-white mt-7 mx-auto font-semibold pb-8 text-2xl">
          Events
        </div>
      </div>

      {isLoadingMoreEvents ? (
        <div className="text-white">Loading more events...</div>
      ) : errorMoreEvents ? (
        <div className="text-red-500">Failed to load more events.</div>
      ) : (
        <div className="grid grid-cols-4 gap-20   p-4 w-3/4 text-white">
          {moreEvents.map((event) => (
            <Link key={event.id} href={`/events/${event.id}`}>
              <div className="flex items-center hover:scale-110 transition-all duration-300 mb-32">
                <Image
                  src={event.poster}
                  alt={event.name}
                  width={200}
                  height={200}
                  className="rounded-full object-cover w-20 translate-x-2"
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