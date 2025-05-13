"use client"

import { usePlayer } from "../context/PlayerContext"

const SongItem = ({ id, title, artist, album, duration, status = "approved", coverImage, onMore }) => {
  const { playSong, currentSong, isFavorite, toggleFavorite } = usePlayer()

  const isActive = currentSong && currentSong.id === id
  const songIsFavorite = isFavorite(id)

  const statusColors = {
    approved: "text-green-500",
    pending: "text-yellow-500",
    rejected: "text-red-500",
  }

  const statusDot = {
    approved: "✅",
    pending: "⏳",
    rejected: "☠️",
  }

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg ${isActive ? "bg-white/5" : "hover:bg-white/5"} transition-colors cursor-pointer`}
      onClick={() => playSong({ id, title, artist, album, duration, status, coverImage })}
    >
      <div className="flex items-center space-x-3">
        {coverImage ? (
          <img src={coverImage || "/placeholder.svg"} alt={title} className="w-12 h-12 rounded object-cover" />
        ) : (
          <div className="w-12 h-12 rounded bg-gray-700 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
        )}

        <div>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(id)
              }}
              className="text-gray-400 hover:text-jugnu-pink transition-colors"
            >
              {songIsFavorite ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#FF3366"
                  stroke="#FF3366"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              )}
            </button>
            <h3 className="font-medium text-white">{title}</h3>
            {artist && <span className="text-sm text-gray-400">- {artist}</span>}
          </div>

          <div className="text-sm text-gray-500">{album}</div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-400">{duration}</span>
        <span className={`text-sm ${statusColors[status]}`}>
          <span className="mr-1">{statusDot[status]}</span>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onMore && onMore(id)
          }}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SongItem
