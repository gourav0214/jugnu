"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SideNavigation from "../components/SideNavigation"
import SongItem from "../components/SongItem"
import PlayerControls from "../components/PlayerControls"
import Button from "../components/Button"
import { Upload, Plus } from "lucide-react"
import { usePlayer } from "@/context/PlayerContext"
import { useAuth } from "@/context/AuthContext"

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { currentSong, getAllSongs } = usePlayer()
  const [activeTab, setActiveTab] = useState("all")

  const songs = getAllSongs()

  return (
    <div className="min-h-screen bg-jugnu-pattern text-white">
      <SideNavigation activePath="/dashboard" />

      <div className="pl-16 pr-4">
        <div className="max-w-6xl mx-auto py-6">
          <div className="flex flex-col md:flex-row gap-8 mb-8 animate-fade-in">
            <div className="w-full md:w-64 h-64">
              <img
                src={"/Lead-image.svg"}
                alt="Artist Profile"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 animate-slide-up">
              <h1 className="text-4xl font-bold mb-2">{user?.name || "Artist"}'s tunes</h1>
              <p className="text-gray-400 mb-4">Share your music with the world and connect with fans</p>

              <div className="flex items-center gap-2 mb-8">
                <span className="text-gray-400">{songs.length} songs</span>
                <span className="text-gray-600">-</span>
                <span className="text-gray-400">16 hrs+</span>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="primary"
                  icon={<Upload size={18} />}
                  onClick={() => navigate("/upload")}
                  className="transform transition-transform hover:scale-105"
                >
                  Upload Song
                </Button>
                <Button
                  variant="secondary"
                  icon={<Plus size={18} />}
                  onClick={() => navigate("/create-album")}
                  className="transform transition-transform hover:scale-105"
                >
                  Create Album
                </Button>
                <button className="w-10 h-10 bg-transparent border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="red" stroke="white" strokeWidth="1">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6 border-b border-white/10 animate-fade-in">
            <div className="flex space-x-4">
              <button
                className={`py-2 px-4 ${activeTab === "all" ? "text-white border-b-2 border-jugnu-red" : "text-gray-400 hover:text-white"} transition-colors`}
                onClick={() => setActiveTab("all")}
              >
                All Songs
              </button>
              <button
                className={`py-2 px-4 ${activeTab === "approved" ? "text-white border-b-2 border-jugnu-red" : "text-gray-400 hover:text-white"} transition-colors`}
                onClick={() => setActiveTab("approved")}
              >
                Approved
              </button>
              <button
                className={`py-2 px-4 ${activeTab === "pending" ? "text-white border-b-2 border-jugnu-red" : "text-gray-400 hover:text-white"} transition-colors`}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-2 animate-slide-up pb-24">
            {songs
              .filter((song) => activeTab === "all" || song.status === activeTab)
              .map((song) => (
                <SongItem
                  key={song.id}
                  id={song.id}
                  title={song.title}
                  artist={song.artist}
                  album={song.album}
                  duration={song.duration}
                  status={song.status}
                  coverImage={song.coverImage}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Fixed Player at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-jugnu-dark/70 backdrop-blur-md border-t border-white/10 py-2 animate-slide-up">
        <div className="max-w-6xl mx-auto px-4 flex items-center">
          <div className="flex items-center space-x-3 w-1/4">
            {currentSong ? (
              <>
                {currentSong.coverImage ? (
                  <img
                    src={currentSong.coverImage || "/placeholder.svg"}
                    alt={currentSong.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-gray-700"></div>
                )}
                <div>
                  <h4 className="font-medium text-white">{currentSong.title}</h4>
                  <p className="text-sm text-gray-400">{currentSong.artist}</p>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <img
                  src="/artist3.svg"
                  alt="Currently playing"
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <h4 className="font-medium text-white">Seasons in</h4>
                  <p className="text-sm text-gray-400">James</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex-1">
            <PlayerControls />
          </div>

          <div className="w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
