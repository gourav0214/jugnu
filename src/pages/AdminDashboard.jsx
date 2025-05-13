"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Button from "../components/Button"
import { toast } from "../components/ui/sonner"
import SideNavigation from "../components/SideNavigation"
import { Users, Music, Activity } from "lucide-react"

// Mock songs data - in a real app, this would come from an API
const MOCK_SONGS = [
  {
    id: "1",
    title: "Let me love you - Krisx",
    artist: "Krisx",
    artistId: "2",
    status: "pending",
    uploadDate: "2025-05-07",
    genre: "Pop",
    duration: "4:17",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Watin man go do - Burna",
    artist: "Burna",
    artistId: "3",
    status: "approved",
    uploadDate: "2025-05-07",
    genre: "Pop",
    duration: "2:30",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Stand strong - Davido",
    artist: "Davido",
    artistId: "4",
    status: "pending",
    uploadDate: "2025-05-07",
    genre: "Pop",
    duration: "2:02",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Closa - Ybee",
    artist: "Ybee",
    artistId: "5",
    status: "pending",
    uploadDate: "2025-05-07",
    genre: "Pop",
    duration: "3:23",
    coverImage: "/Lead-image.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "All I need - James",
    artist: "James",
    artistId: "6",
    status: "approved",
    uploadDate: "2025-05-07",
    genre: "Pop",
    duration: "4:22",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
]
const AdminDashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [songs, setSongs] = useState(MOCK_SONGS)
  const [filter, setFilter] = useState("all") // all, pending, approved, rejected

  useEffect(() => {
    // Redirect if not admin
    if (!user || user.role !== "admin") {
      navigate("/login")
    }
  }, [user, navigate])

  const handleStatusChange = (songId, newStatus) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              status: newStatus,
            }
          : song,
      ),
    )
    toast.success(`Song ${newStatus} successfully`)
  }

  const filteredSongs = songs.filter((song) => {
    if (filter === "all") return true
    return song.status === filter
  })

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-jugnu-pattern text-white">
      <SideNavigation activePath="/admin" />
      <div className="pl-20 pr-4">
        <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400">Welcome, {user.name}</p>
          </div>
          {/* <Button onClick={logout} variant="outline">
            Logout
          </Button> */}
        </div>

        <div className="bg-[#040249] rounded-lg p-6 shadow-lg">
          <div className="flex gap-4 mb-6">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All Songs
            </Button>
            <Button
              variant={filter === "pending" ? "default" : "outline"}
              onClick={() => setFilter("pending")}
            >
              Pending
            </Button>
            <Button
              variant={filter === "approved" ? "default" : "outline"}
              onClick={() => setFilter("approved")}
            >
              Approved
            </Button>
            <Button
              variant={filter === "rejected" ? "default" : "outline"}
              onClick={() => setFilter("rejected")}
            >
              Rejected
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-200">
              <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Artist</th>
                  <th className="py-3 px-4">Genre</th>
                  <th className="py-3 px-4">Upload Date</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSongs.map((song) => (
                  <tr key={song.id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{song.title}</td>
                    <td className="py-3 px-4">{song.artist}</td>
                    <td className="py-3 px-4">{song.genre}</td>
                    <td className="py-3 px-4">{song.uploadDate}</td>
                    <td className="py-3 px-4">{song.duration}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          song.status === "approved"
                            ? "bg-green-500/20 text-green-500"
                            : song.status === "rejected"
                            ? "bg-red-500/20 text-red-500"
                            : "bg-yellow-500/20 text-yellow-500"
                        }`}
                      >
                        {song.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {song.status === "pending" && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="success"
                            onClick={() => handleStatusChange(song.id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(song.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-all cursor-pointer transform hover:scale-105"
               onClick={() => navigate("/artists")}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Total Artists</h3>
                <p className="text-2xl font-bold">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Music className="w-6 h-6 text-purple-500" />
              </div>
              <div onClick={() => navigate("/songs")}>
                <h3 className="text-lg font-semibold">Total Songs</h3>
                <p className="text-2xl font-bold">{songs.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-all cursor-pointer transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Active Users</h3>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
