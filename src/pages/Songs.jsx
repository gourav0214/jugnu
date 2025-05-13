import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../components/SideNavigation";
import { useAuth } from "@/context/AuthContext";
import { usePlayer } from "@/context/PlayerContext";
import { Music, Filter, Search as SearchIcon } from "lucide-react";
import PlayerControls from "../components/PlayerControls";

const Songs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAllSongs, currentSong, playSong } = usePlayer();
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(getAllSongs());
  }, [getAllSongs]);

  const genres = ["all", "pop", "rock", "jazz", "classical", "hip-hop", "electronic"];

  const filteredSongs = songs.filter((song) => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = genreFilter === "all" || song.genre.toLowerCase() === genreFilter;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="min-h-screen bg-jugnu-pattern text-white">
      <SideNavigation activePath="/songs" />

      <div className="pl-20 pr-4 pb-28">
        <div className="max-w-7xl mx-auto py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 animate-fade-in">
            <div>
              <h1 className="text-4xl font-bold flex items-center gap-3">
                <Music className="w-8 h-8 text-jugnu-red" />
                Songs Library
              </h1>
              <p className="text-gray-400 mt-2">Discover and play your favorite music</p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search songs or artists..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:border-jugnu-red transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="relative w-full md:w-48">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-lg border border-white/10 focus:outline-none focus:border-jugnu-red transition-colors appearance-none cursor-pointer"
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre} className="bg-jugnu-dark">
                      {genre.charAt(0).toUpperCase() + genre.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Songs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className={`group bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all cursor-pointer transform hover:scale-105 ${
                  currentSong?.id === song.id ? "border border-jugnu-red" : ""
                }`}
                onClick={() => playSong(song)}
              >
                <div className="aspect-square mb-4 relative overflow-hidden rounded-lg">
                  <img
                    src={song.coverImage || "/placeholder.svg"}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-jugnu-red flex items-center justify-center">
                      {currentSong?.id === song.id ? (
                        <span className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      ) : (
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-1 truncate">{song.title}</h3>
                <p className="text-gray-400 text-sm mb-2 truncate">{song.artist}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-white/10 rounded-full">
                    {song.genre}
                  </span>
                  <span className="text-xs text-gray-400">{song.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Player at Bottom */}
      {currentSong && (
        <div className="fixed bottom-0 left-20 right-20 bg-jugnu-dark/70 backdrop-blur-md border-t border-white/10 py-2 animate-slide-up rounded-t-2xl">
          <div className="max-w-7xl mx-auto px-4 flex items-center">
            <div className="flex items-center space-x-3 w-1/4">
              <img
                src={currentSong.coverImage || "/placeholder.svg"}
                alt={currentSong.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <h4 className="font-medium text-white truncate">{currentSong.title}</h4>
                <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
              </div>
            </div>

            <div className="flex-1">
              <PlayerControls />
            </div>

            <div className="w-1/4" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Songs;
