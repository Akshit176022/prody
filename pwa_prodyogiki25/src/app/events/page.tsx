"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Burger from "../home/components/hamburger";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Event {
  id: number;
  name: string;
  description: string;
  abstract_link: string;
  poster: string;
  date_time: string;
  is_live: boolean;
  is_completed: boolean;
  is_team_event: boolean;
  max_members: number;
}

interface User {
  username: string;
  user_id: string;
  prody_points: number;
  registered_events: {
    is_live_events: Event[];
    is_upcoming_events: Event[];
    is_completed_events: Event[];
  };
}

export default function Event() {
  const [visibleEvent, setVisibleEvent] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [teamId, setTeamId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const [isJoinTeam, setIsJoinTeam] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Fetch events (no authentication required)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/`
        );
        setEvents(response.data);
      } catch (err) {
        console.log("Error fetching events:", err);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
  }, []);

  // Fetch user profile if logged in
  const fetchUserProfile = async (token: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/user/`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setIsLoggedIn(false);
    }
  };

  // Check if the user is registered for the selected event
  useEffect(() => {
    if (user && user.registered_events && selectedEvent) {
      const { is_live_events, is_completed_events, is_upcoming_events } = user.registered_events;
      const userRegisteredEvents = [...is_live_events, ...is_completed_events, ...is_upcoming_events];
      const found = userRegisteredEvents.some((e) => e.id === selectedEvent.id);
      setIsRegistered(found);
    }
  }, [user, selectedEvent]);

  const toggleEventDetails = (index: number) => {
    setVisibleEvent((prev) => (prev === index ? null : index));
  };

  const handleRegisterClick = (event: Event) => {
    if (!isLoggedIn) {
      alert("You must be logged in to register for an event.");
      router.push("/login");
      return;
    }
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCreateTeam(false);
    setIsJoinTeam(false);
    setTeamId("");
    setTeamName("");
  };

  const handleRegister = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      alert("You must be logged in to register for an event.");
      router.push("/login");
      return;
    }

    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const expiration = tokenPayload.exp * 1000;
    if (Date.now() > expiration) {
      alert("Your session has expired. Please log in again.");
      localStorage.removeItem("jwt");
      router.push("/login");
      return;
    }

    if (!selectedEvent) {
      alert("Event details are not available.");
      return;
    }

    try {
      if (selectedEvent.is_team_event) {
        if (isCreateTeam) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-team/`,
            { name: teamName, user_id: tokenPayload.user_id, event_id: selectedEvent.id },
            { headers: { Authorization: ` ${token}` } }
          );
        } else if (isJoinTeam) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/join-team/`,
            { user_id: tokenPayload.user_id, team_id: teamId, event_id: selectedEvent.id },
            { headers: { Authorization: ` ${token}` } }
          );
        }
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register-event/${selectedEvent.id}/`,
          { user_id: tokenPayload.user_id },
          { headers: { Authorization: ` ${token}` } }
        );
      }

      alert("Registration successful!");
      handleCloseModal();
      // router.push("/profile");
      if (selectedEvent.id === 5) {
        window.location.href = "https://abhedya.istenith.com/";
      } else {
        router.push("/profile");
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("jwt");
          router.push("/login");
        } else {
          console.log("Already registered", error);
          alert("Already registered!!");
        }
      } else {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="bg-cover bg-center font-sans min-h-screen">
        <Burger />
        <div className="text-center pt-24 text-white font-sans text-[28px]">
          OUR EVENTS
        </div>
        <div className="flex flex-col pt-8 text-white">
          <div className="w-full flex flex-col">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                className="mb-0 w-full flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {visibleEvent !== index && (
                  <motion.div
                    onClick={() => toggleEventDetails(index)}
                    className="w-3/4 border-x-[3px] border-t-[3px]  border-b-[1px] border-teal-600 rounded-[20px] py-3 pl-4 text-[24px] cursor-pointer transition-transform duration-500"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {event.name}
                  </motion.div>
                )}

<motion.div
  className={`w-3/4 relative mb-10 rounded-[30px] border border-teal-600 overflow-hidden text-white ${
    visibleEvent === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
  }`}
  initial={{ opacity: 0 }}
  animate={{
    opacity: visibleEvent === index ? 1 : 0,
    height: visibleEvent === index ? "auto" : "0",
  }}
  transition={{
    duration: 0.5,
    ease: "easeInOut",
  }}
>
  <motion.div
    className="cursor-pointer"
    initial={{ scale: 0.8 }}
    animate={{ scale: visibleEvent === index ? 1 : 0.8 }}
    transition={{ duration: 0.4 }}
  >
    <Image
      width={149}
      height={149}
      src={event.poster}
      alt="Event Image"
      className="w-full h-full object-cover rounded-t-[30px]"
    />
    
    <div className="absolute top-0 bg-transparent w-full px-2 rounded-b-[30px] flex flex-col h-full">
      
      <Link href={event.abstract_link}>
        <div className="text-center absolute right-4 top-2 text-[14px] rounded px-3 bg-black/60 text-white/80">
          ABSTRACT
        </div>
      </Link>

    
      {/* <div className="flex-1 flex items-center justify-center">
        <div className="text-[14px] text-center backdrop-blur-sm px-4 opacity-75">
          {event.description}
        </div>
      </div> */}

      {/* <div className="text-center  mt-12 mx-[20%] backdrop-blur-2xl text-3xl">{event.name}</div> */}

      
      <div className="mt-64 text-center p-4">
        {isLoggedIn && isRegistered ? (
          <button className="border px-3 border-white bg-black text-white/80">
            Registered
          </button>
        ) : (
          <button
            className="border rounded px-3 border-black bg-black/60 text-white/80"
            onClick={() => handleRegisterClick(event)}
          >
            Register
          </button>
        )}
      </div>
      
    </div>
  </motion.div>
</motion.div>
</motion.div>

            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-md"
            onClick={handleCloseModal}
          ></div>
          <div className="bg-black border-2 border-teal-600 rounded-3xl p-6 w-[90%] max-w-md relative z-50">
            <h2 className="text-2xl font-bold text-white mb-4">
              Register for {selectedEvent.name}
            </h2>
            {selectedEvent.is_team_event ? (
              <>
                {!isCreateTeam && !isJoinTeam ? (
                  <div className="mb-4">
                    <button
                      onClick={() => setIsCreateTeam(true)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Create Team
                    </button>
                    <button
                      onClick={() => setIsJoinTeam(true)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg"
                    >
                      Join Team
                    </button>
                  </div>
                ) : (
                  <>
                    {isCreateTeam && (
                      <div className="mb-4">
                        <label className="block text-white text-sm mb-2">
                          Team Name:
                        </label>
                        <input
                          type="text"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                          className="w-full p-2 border border-teal-600 bg-black text-white rounded-lg"
                          placeholder="Enter Team Name"
                        />
                      </div>
                    )}
                    {isJoinTeam && (
                      <div className="mb-4">
                        <label className="block text-white text-sm mb-2">
                          Team ID:
                        </label>
                        <input
                          type="text"
                          value={teamId}
                          onChange={(e) => setTeamId(e.target.value)}
                          className="w-full p-2 border border-teal-600 bg-black text-white rounded-lg"
                          placeholder="Enter Team ID"
                        />
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <p className="text-white mb-4">
                You are registering as an individual for this event.
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRegister}
                className={`${
                  (selectedEvent.is_team_event &&
                    ((isCreateTeam && !teamName) ||
                      (isJoinTeam && !teamId) ||
                      (!isCreateTeam && !isJoinTeam)))
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                } text-white px-4 py-2 rounded-lg`}
                disabled={
                  selectedEvent.is_team_event &&
                  ((isCreateTeam && !teamName) ||
                    (isJoinTeam && !teamId) ||
                    (!isCreateTeam && !isJoinTeam))
                }
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}