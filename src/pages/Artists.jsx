import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../components/SideNavigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "../components/ui/sonner";

const Artists = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artists, setArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Access denied. Admin only area.");
      navigate("/dashboard");
      return;
    }
  }, [user, navigate]);

  // Mock artists data - Replace with actual API call
  useEffect(() => {
    setArtists([
      {
        id: 1,
        name: "John Doe",
        profileImage: "/artist1.svg",
        totalSongs: 15,
        followers: 1200,
        status: "active",
      },
      {
        id: 2,
        name: "Jane Smith",
        profileImage: "/artist2.svg",
        totalSongs: 8,
        followers: 800,
        status: "pending",
      },
      // Add more mock artists
    ]);
  }, []);

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-jugnu-pattern text-white">
      <SideNavigation activePath="/artists" />

      <div className="pl-16 pr-4">
        <div className="max-w-6xl mx-auto py-6">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold mb-4">Artists</h1>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search artists..."
                className="w-64 px-4 py-2 bg-white/10 rounded-lg border border-white/20 focus:outline-none focus:border-jugnu-red transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/artist/${artist.id}`)}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={artist.profileImage}
                    alt={artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{artist.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{artist.totalSongs} songs</span>
                      <span>{artist.followers} followers</span>
                    </div>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                        artist.status === "active"
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      }`}
                    >
                      {artist.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artists;
