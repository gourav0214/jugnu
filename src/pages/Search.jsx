"use client"

import { useState, useEffect } from "react"
import SideNavigation from "../components/SideNavigation"
import SongItem from "../components/SongItem"
import { SearchIcon } from "lucide-react"
import { usePlayer } from "@/context/PlayerContext"

const Search = () => {
  const { getAllSongs } = usePlayer()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])

  // Get all songs from player context
  const allSongs = getAllSongs()

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem("jugnu_recent_searches")
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches))
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)

    // Add to recent searches
    if (!recentSearches.includes(searchQuery)) {
      const newRecentSearches = [searchQuery, ...recentSearches.slice(0, 4)]
      setRecentSearches(newRecentSearches)
      localStorage.setItem("jugnu_recent_searches", JSON.stringify(newRecentSearches))
    }

    // Simulate search with a delay
    setTimeout(() => {
      // Filter songs based on search query
      const filteredSongs = allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.album.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setSearchResults(filteredSongs)
      setIsSearching(false)
    }, 500)
  }

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query)
    // Trigger search
    const event = { preventDefault: () => {} }
    handleSearch(event)
  }

  return (
    <div className="min-h-screen bg-jugnu-pattern text-white">
      <SideNavigation activePath="/search" />

      <div className="pl-16 pr-4">
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 animate-fade-in">Search Music</h1>

          <form onSubmit={handleSearch} className="mb-8 animate-slide-up">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-jugnu-dark border border-gray-700 rounded-full px-6 py-3 pr-12 text-white focus:border-jugnu-pink focus:outline-none transition-colors"
                placeholder="Search for songs, artists, or albums..."
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <SearchIcon size={24} />
              </button>
            </div>
          </form>

          {recentSearches.length > 0 && !searchQuery && (
            <div className="mb-8 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">Recent Searches</h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(query)}
                    className="bg-jugnu-dark/50 hover:bg-jugnu-dark px-4 py-2 rounded-full text-sm transition-colors"
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 animate-slide-up">
            {isSearching ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-jugnu-red border-r-2 border-gray-500 mb-4"></div>
                <p>Searching...</p>
              </div>
            ) : searchQuery ? (
              searchResults.length > 0 ? (
                <div>
                  <h2 className="text-xl font-bold mb-4">Search Results ({searchResults.length})</h2>
                  <div className="space-y-2">
                    {searchResults.map((song) => (
                      <SongItem
                        key={song.id}
                        id={song.id}
                        title={song.title}
                        artist={song.artist}
                        album={song.album}
                        duration={song.duration}
                        coverImage={song.coverImage}
                        status={song.status}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-500 mt-2">Try different keywords or check spelling</p>
                </div>
              )
            ) : (
              <div className="bg-jugnu-dark/30 rounded-xl p-6 text-center">
                <SearchIcon size={48} className="mx-auto mb-4 text-gray-500" />
                <h2 className="text-xl font-semibold mb-2">Search for Music</h2>
                <p className="text-gray-400">Enter keywords to find songs, artists, or albums</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
