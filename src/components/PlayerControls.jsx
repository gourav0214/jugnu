"use client"

import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat } from "lucide-react"
import { usePlayer } from "../context/PlayerContext"

const PlayerControls = () => {
  const {
    isPlaying,
    togglePlayPause,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
    volume,
    setVolume,
    progress,
    seekTo,
    shuffle,
    repeat,
    currentTime,
    duration,
    formatTime,
  } = usePlayer()

  const handleProgressChange = (e) => {
    const newProgress = Number(e.target.value)
    seekTo(newProgress)
  }

  const handleVolumeChange = (e) => {
    const newVolume = Number(e.target.value)
    setVolume(newVolume)
  }

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center gap-4 mb-2">
        <button
          onClick={toggleShuffle}
          className={`p-2 ${shuffle ? "text-jugnu-pink" : "text-gray-400"} hover:text-white transition-colors`}
        >
          <Shuffle size={20} />
        </button>
        <button onClick={playPrevious} className="p-2 text-gray-200 hover:text-white transition-colors">
          <SkipBack size={24} />
        </button>
        <button
          onClick={togglePlayPause}
          className="p-3 bg-white rounded-full text-jugnu-navy hover:bg-gray-200 transition-all transform hover:scale-105"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={playNext} className="p-2 text-gray-200 hover:text-white transition-colors">
          <SkipForward size={24} />
        </button>
        <button
          onClick={toggleRepeat}
          className={`p-2 ${repeat ? "text-jugnu-pink" : "text-gray-400"} hover:text-white transition-colors`}
        >
          <Repeat size={20} />
        </button>
      </div>

      <div className="w-full max-w-md px-4 flex items-center gap-2">
        <span className="text-xs text-gray-400 min-w-[40px]">{formatTime(currentTime)}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleProgressChange}
          className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
          }}
        />
        <span className="text-xs text-gray-400 min-w-[40px]">{formatTime(duration)}</span>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Volume2 size={20} className="text-gray-200" />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-32 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, white ${volume}%, rgba(255,255,255,0.3) ${volume}%)`,
          }}
        />
      </div>
    </div>
  )
}

export default PlayerControls
