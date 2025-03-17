"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Navbar from "../componenets/Navbar";
import Footer from "../componenets/Footer";

// ✅ Define the Sponsor interface
interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website?: string;
  tier: string;
}

const SponsorsPage: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get<Sponsor[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sponsors/`);
        setSponsors(response.data);
      } catch (err) {
        console.error("Error fetching sponsors:", err); // ✅ Logs the error
        setError("Failed to fetch sponsors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);
  

  // ✅ Group sponsors by tier
  const groupedSponsors = sponsors.reduce((acc: Record<string, Sponsor[]>, sponsor: Sponsor) => {
    if (!acc[sponsor.tier]) {
      acc[sponsor.tier] = [];
    }
    acc[sponsor.tier].push(sponsor);
    return acc;
  }, {});

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading sponsors...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="text-white p-6">
      <Navbar />
      <h1 className="text-4xl mt-20 font-bold text-center mb-8">Our Partners</h1>
      {Object.entries(groupedSponsors).map(([tier, sponsors]) => (
        <div key={tier} className="mb-12">
          <h2 className="text-2xl font-semibold text-center mt-6 mb-12">{tier} Sponsors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sponsors.map((sponsor: Sponsor) => (
              <div
                key={sponsor.id}
                className="flex flex-col items-center bg-white/15 backdrop-blur-md border border-teal-500/30 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <div className="w-32 h-32 relative mb-4">
                  <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain" />
                </div>
                <h3 className="text-xl font-semibold text-center">{sponsor.name}</h3>
                {sponsor.website && (
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className="text-teal-300 hover:text-teal-100 mt-2">
                    Visit Website
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default SponsorsPage;
