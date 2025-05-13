"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the player context
const PlayerContext = createContext(null)

// Mock songs data
const MOCK_SONGS = [
  {
    id: "1",
    title: "Let me love you - Krisx",
    artist: "Krisx",
    album: "Single",
    duration: "4:17",
    status: "approved",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Watin man go do - Burna",
    artist: "Burna",
    album: "African giant",
    duration: "2:30",
    status: "approved",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Stand strong - Davido",
    artist: "Davido",
    album: "Single",
    duration: "2:02",
    status: "pending",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Closa - Ybee",
    artist: "Ybee",
    album: "Obi datti",
    duration: "3:23",
    status: "pending",
    coverImage: "/Lead-image.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "All I need - James",
    artist: "James",
    album: "Single",
    duration: "4:22",
    status: "approved",
    coverImage: "/artist3.svg",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
]

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(70)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioElement, setAudioElement] = useState(null)
  const [queue, setQueue] = useState([])
  const [favorites, setFavorites] = useState([])
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio()
    setAudioElement(audio)

    // Load favorites from localStorage
    const storedFavorites = localStorage.getItem("jugnu_favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }

    return () => {
      audio.pause()
      audio.src = ""
    }
  }, [])

  // Update audio element when current song changes
  useEffect(() => {
    if (audioElement && currentSong) {
      audioElement.src = currentSong.audioUrl
      audioElement.load()
      if (isPlaying) {
        audioElement.play()
      }
    }
  }, [currentSong, audioElement])

  // Handle play/pause
  useEffect(() => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.play()
      } else {
        audioElement.pause()
      }
    }
  }, [isPlaying, audioElement])

  // Update volume
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume / 100
    }
  }, [volume, audioElement])

  // Set up audio event listeners
  useEffect(() => {
    if (audioElement) {
      const updateProgress = () => {
        if (audioElement.duration) {
          setProgress((audioElement.currentTime / audioElement.duration) * 100)
          setCurrentTime(audioElement.currentTime)
        }
      }

      const handleLoadedMetadata = () => {
        setDuration(audioElement.duration)
      }

      const handleEnded = () => {
        if (repeat) {
          audioElement.currentTime = 0
          audioElement.play()
        } else {
          playNext()
        }
      }

      audioElement.addEventListener("timeupdate", updateProgress)
      audioElement.addEventListener("loadedmetadata", handleLoadedMetadata)
      audioElement.addEventListener("ended", handleEnded)

      return () => {
        audioElement.removeEventListener("timeupdate", updateProgress)
        audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
        audioElement.removeEventListener("ended", handleEnded)
      }
    }
  }, [audioElement, repeat])

  // Play a song
  const playSong = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)

    // Add to queue if not already in queue
    if (!queue.some((item) => item.id === song.id)) {
      setQueue((prev) => [...prev, song])
    }
  }

  // Toggle play/pause
  const togglePlayPause = () => {
    if (currentSong) {
      setIsPlaying(!isPlaying)
    } else if (queue.length > 0) {
      // If no current song but queue has songs, play first song in queue
      playSong(queue[0])
    } else if (MOCK_SONGS.length > 0) {
      // If no queue, play first song in library
      playSong(MOCK_SONGS[0])
    }
  }

  // Seek to position
  const seekTo = (percent) => {
    if (audioElement && audioElement.duration) {
      const newTime = (percent / 100) * audioElement.duration
      audioElement.currentTime = newTime
      setProgress(percent)
    }
  }

  // Play next song
  const playNext = () => {
    if (!currentSong || queue.length === 0) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)

    if (shuffle) {
      // Play random song from queue
      const nextIndex = Math.floor(Math.random() * queue.length)
      playSong(queue[nextIndex])
    } else if (currentIndex < queue.length - 1) {
      // Play next song in queue
      playSong(queue[currentIndex + 1])
    } else if (repeat) {
      // If repeat is on and we're at the end, go back to first song
      playSong(queue[0])
    } else {
      // Stop playing if we're at the end and repeat is off
      setIsPlaying(false)
    }
  }

  // Play previous song
  const playPrevious = () => {
    if (!currentSong || queue.length === 0) return

    const currentIndex = queue.findIndex((song) => song.id === currentSong.id)

    if (currentIndex > 0) {
      playSong(queue[currentIndex - 1])
    } else if (repeat) {
      // If repeat is on and we're at the beginning, go to last song
      playSong(queue[queue.length - 1])
    } else {
      // If at beginning, restart current song
      if (audioElement) {
        audioElement.currentTime = 0
      }
    }
  }

  // Toggle shuffle
  const toggleShuffle = () => {
    setShuffle(!shuffle)
  }

  // Toggle repeat
  const toggleRepeat = () => {
    setRepeat(!repeat)
  }

  // Toggle favorite
  const toggleFavorite = (songId) => {
    let newFavorites

    if (favorites.includes(songId)) {
      newFavorites = favorites.filter((id) => id !== songId)
    } else {
      newFavorites = [...favorites, songId]
    }

    setFavorites(newFavorites)
    localStorage.setItem("jugnu_favorites", JSON.stringify(newFavorites))
  }

  // Check if song is favorite
  const isFavorite = (songId) => {
    return favorites.includes(songId)
  }

  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00"

    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  // Get all songs
  const getAllSongs = () => {
    return MOCK_SONGS
  }

  // Add song to library
  const addSong = (songData) => {
    const newSong = {
      id: String(MOCK_SONGS.length + 1),
      title: songData.songName,
      artist: songData.artist,
      album: songData.album || "Single",
      duration: "0:00", // This would be calculated from the actual audio file
      status: "pending",
      coverImage: songData.coverImageUrl || "/dashboard-bg.svg",
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Placeholder
    }

    MOCK_SONGS.push(newSong)
    return newSong
  }

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        progress,
        volume,
        duration,
        currentTime,
        queue,
        shuffle,
        repeat,
        playSong,
        togglePlayPause,
        seekTo,
        setVolume,
        playNext,
        playPrevious,
        toggleShuffle,
        toggleRepeat,
        toggleFavorite,
        isFavorite,
        formatTime,
        getAllSongs,
        addSong,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

// Custom hook to use the player context
export const usePlayer = () => {
  const context = useContext(PlayerContext)
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider")
  }
  return context
}
