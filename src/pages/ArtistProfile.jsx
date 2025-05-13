import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SideNavigation from "../components/SideNavigation";
import SongItem from "../components/SongItem";
import Button from "../components/Button";
import { UserCheck, UserX, Music } from "lucide-react";
import { toast } from "../components/ui/sonner";
import { useAuth } from "@/context/AuthContext";

const ArtistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Access denied. Admin only area.");
      navigate("/dashboard");
      return;
    }
  }, [user, navigate]);

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Fetch artist data
    setArtist({
      id,
      name: "John Doe",
      profileImage: "/artist1.svg",
      totalSongs: 15,
      followers: 1200,
      status: "active",
      joinDate: "2025-01-15",
      bio: "Professional musician with a passion for creating unique melodies.",
    });

    // Fetch artist's songs
    setSongs([
      {
        id: "1",
        title: "Summer Vibes",
        artist: "John Doe",
        status: "approved",
        duration: "3:45",
        coverImage: "/song1.jpg",
      },
      {
        id: "2",
        title: "Midnight Dreams",
        artist: "John Doe",
        status: "pending",
        duration: "4:20",
        coverImage: "/song2.jpg",
      },
    ]);
  }, [id]);

  const handleStatusChange = (newStatus) => {
    setArtist((prev) => ({
      ...prev,
      status: newStatus,
    }));
    toast.success(`Artist ${newStatus} successfully`);
  };

  if (!user || user.role !== "admin" || !artist) {
    return null;
  }

  return (
    <div className="min-h-screen bg-jugnu-pattern text-white">
      <SideNavigation activePath="/artists" />

      <div className="pl-16 pr-4">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex flex-col md:flex-row gap-8 mb-8 animate-fade-in">
            <div className="w-full md:w-64">
              <img
                src={artist.profileImage}
                alt={artist.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 animate-slide-up">
              <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
                <div className="flex gap-2">
                  {artist.status === "pending" && (
                    <>
                      <Button
                        variant="success"
                        icon={<UserCheck size={18} />}
                        onClick={() => handleStatusChange("active")}
                        className="transform transition-transform hover:scale-105"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        icon={<UserX size={18} />}
                        onClick={() => handleStatusChange("banned")}
                        className="transform transition-transform hover:scale-105"
                      >
                        Ban
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-400 mb-4">{artist.bio}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400">Total Songs</h3>
                  <p className="text-2xl font-bold">{artist.totalSongs}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400">Followers</h3>
                  <p className="text-2xl font-bold">{artist.followers}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400">Status</h3>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs mt-2 ${
                      artist.status === "active"
                        ? "bg-green-500/20 text-green-500"
                        : artist.status === "banned"
                        ? "bg-red-500/20 text-red-500"
                        : "bg-yellow-500/20 text-yellow-500"
                    }`}
                  >
                    {artist.status}
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-sm text-gray-400">Joined</h3>
                  <p className="text-lg font-medium">{artist.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Songs</h2>
              <div className="flex items-center gap-2 text-gray-400">
                <Music size={20} />
                <span>{songs.length} songs</span>
              </div>
            </div>

            <div className="space-y-2 animate-slide-up">
              {songs.map((song) => (
                <SongItem
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  status={song.status}
                  coverImage={song.coverImage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
