"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Footer from "../../componenets/Footer";
import Navbar from "@/app/componenets/Navbar";

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
  registered_events: {
       is_live_events: Event[];
       is_completed_events: Event[];
       is_upcoming_events: Event[];
  };
  username: string;
  user_id: string;
  email: string;
}

export default function EventDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [teamId, setTeamId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [isCreateTeam, setIsCreateTeam] = useState(false);
  const [isJoinTeam, setIsJoinTeam] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}/`);
        setEvent(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Failed to fetch event details:", error);
        setError("Registerations for this event will be starting soon!! Stay tuned.");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]); 

  useEffect(() => {
    const token = localStorage.getItem("jwt");
  
    const fetchUserProfile = async () => {
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
      }
    };
  
    fetchUserProfile();
  }, []); // Runs only on mount
  
  useEffect(() => {
    if (user && user.registered_events) {
      const { is_live_events, is_completed_events, is_upcoming_events } = user.registered_events;
      const userRegisteredEvents = [...is_live_events, ...is_completed_events, ...is_upcoming_events];
      
      // Check if the event is already registered
      if (event) {
        const found = userRegisteredEvents.some((e) => e.id === event.id);
        console.log(`Event ${event.id} is registered:`, found);
        setIsRegistered(found);
      }
    }
  }, [user, event]); 

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

    if (!event) {
      alert("Event details are not available.");
      return;
    }

    try {
      if (event.is_team_event) {
        if (isCreateTeam) {
            await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-team/`,
            { name: teamName ,
              user_id: tokenPayload.user_id,
              event_id: id
            },
            { headers: { Authorization: ` ${token}` } }
          );

          
        } else if (isJoinTeam) {
          await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/join-team/`,
            { user_id: tokenPayload.user_id, team_id: teamId , event_id: id},
            { headers: { Authorization: ` ${token}` } }
          );
        }
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register-event/${id}/`,
          { user_id: tokenPayload.user_id },
          { headers: { Authorization: ` ${token}` } }
        );
      }

      alert("Registration successful!");
      setShowRegistrationModal(false);
      router.push("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem("jwt");
          router.push("/login");
        } else {
          console.log("Registration failed:", error);
          alert(`Registration failed Team does not exist/Full`);
        }
      } else {
        console.error("Registration failed:", error);
        alert("Registration failed. Please try again.");
      }
    }
  };

  if (loading) return <div className="p-8 text-center text-white">Loading...</div>;
  if (error) return <div className="p-20 font-bold text-center text-blue-900">{error}</div>;
  if (!event) return <div className="p-8 text-center text-white">Event not found!</div>;

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/background.webp')" }}>
      <Navbar/>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-md " style={{ WebkitBackdropFilter: "blur(10px)" }}></div>
      <main className="relative pt-20 z-10">
        <div className="max-w-4xl mx-auto p-6 rounded-3xl shadow-lg border-4 border-teal-700 backdrop-blur-sm mt-10">
          <Image
            src={event.poster}
            alt={event.name}
            className="w-96 ml-4 mt-4 h-64 border-2  border-teal-500 rounded-2xl object-cover"
            height={256}
            width={384}
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-4">{event.name}</h1>
            <div className="mb-4">
              {event.is_live ? (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">Live</span>
              ) : event.is_completed ? (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">Completed</span>
              ) : (
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Upcoming</span>
              )}
            </div>
            {event.is_team_event && (
              <div className="mb-4">
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                  Team Event (Max {event.max_members} members)
                </span>
              </div>
            )}
            <p className="text-white mb-6">{event.description}</p>
            <div className="space-y-4 space-x-4">
              <Link
                href={event.abstract_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all"
              >
                View Abstract
              </Link>
              {isRegistered ?(
                <button
                
                className="inline-block bg-teal-500 text-white px-8 py-2 rounded-lg "
              >
                Registered
              </button>
              ):(
                <button
                onClick={() => setShowRegistrationModal(true)}
                className="inline-block bg-teal-500 text-white px-8 py-2 rounded-lg hover:bg-teal-600 transition-all"
                >
                Register
              </button>
              )}
              
            </div>
          </div>
        </div>
        <div className="mb-12"></div>
        <Footer />
      </main>

      {showRegistrationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md" onClick={() => setShowRegistrationModal(false)}></div>
          <div className="bg-black border-2 border-teal-600 rounded-3xl p-6 w-[90%] max-w-md relative z-50">
            <h2 className="text-2xl font-bold text-white mb-4">Register for {event.name}</h2>
            {event.is_team_event ? (
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
                        <label className="block text-white text-sm mb-2">Team Name:</label>
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
                        <label className="block text-white text-sm mb-2">Team ID:</label>
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
              <p className="text-white mb-4">You are registering as an individual for this event.</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowRegistrationModal(false);
                  setIsCreateTeam(false);
                  setIsJoinTeam(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleRegister} 
                className={`${
                  (event.is_team_event && 
                    ((isCreateTeam && !teamName) || 
                    (isJoinTeam && !teamId) || 
                    (!isCreateTeam && !isJoinTeam))
                  ) 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-teal-600 hover:bg-teal-700"
                } text-white px-4 py-2 rounded-lg`}
                disabled={event.is_team_event && 
                        ((isCreateTeam && !teamName) || 
                          (isJoinTeam && !teamId) || 
                          (!isCreateTeam && !isJoinTeam))}
              >
                {event.is_team_event && 
                ((isCreateTeam && !teamName) || 
                  (isJoinTeam && !teamId) || 
                  (!isCreateTeam && !isJoinTeam)) 
                  ? "Register" 
                  : "Register"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}