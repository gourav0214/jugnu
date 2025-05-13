"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SideNavigation from "../components/SideNavigation"
import Button from "../components/Button"
import { Plus, ImageIcon } from "lucide-react"
import SongItem from "../components/SongItem"
import { usePlayer } from "@/context/PlayerContext"
import { toast } from "@/components/ui/sonner"

const CreateAlbum = () => {
  const navigate = useNavigate()
  const { getAllSongs } = usePlayer()

  const [albumName, setAlbumName] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [previewCover, setPreviewCover] = useState(null)
  const [selectedSongs, setSelectedSongs] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get songs from player context
  const availableSongs = getAllSongs()

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0]
    setCoverImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewCover(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleSongSelection = (songId) => {
    setSelectedSongs((prev) => {
      if (prev.includes(songId)) {
        return prev.filter((id) => id !== songId)
      } else {
        return [...prev, songId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!albumName || selectedSongs.length === 0) {
      toast.error("Please enter an album name and select at least one song")
      return
    }

    setIsSubmitting(true)

    // In a real app, you would create the album on the server
    // For demo, we'll simulate with a delay
    setTimeout(() => {
      setIsSubmitting(false)
      toast.success("Album created successfully!")

      // Navigate to dashboard
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-jugnu-navy text-white">
      <SideNavigation activePath="/create-album" />

      <div className="pl-16 pr-4">
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 animate-fade-in">Create New Album</h1>

          <form onSubmit={handleSubmit} className="space-y-8 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Album Name</label>
                  <input
                    type="text"
                    value={albumName}
                    onChange={(e) => setAlbumName(e.target.value)}
                    className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-4 py-2 text-white focus:border-jugnu-pink focus:outline-none transition-colors"
                    placeholder="Enter album name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-4 py-2 text-white h-32 focus:border-jugnu-pink focus:outline-none transition-colors"
                    placeholder="Enter album description"
                  ></textarea>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-gray-700 rounded-md p-4 text-center min-h-[200px] flex flex-col items-center justify-center hover:border-jugnu-pink transition-colors">
                  <input
                    type="file"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    id="album-cover"
                    accept="image/*"
                  />
                  {previewCover ? (
                    <div>
                      <img
                        src={previewCover || "/placeholder.svg"}
                        alt="Album cover preview"
                        className="mx-auto h-40 w-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="mt-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                        onClick={() => {
                          setCoverImage(null)
                          setPreviewCover(null)
                        }}
                      >
                        Change image
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="album-cover" className="cursor-pointer">
                      <ImageIcon size={48} className="mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-400 mb-2">Upload album cover</p>
                      <p className="text-xs text-gray-500">JPG, PNG or GIF (max 2MB)</p>
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Select Songs</h2>
              <div className="space-y-2">
                {availableSongs.map((song) => (
                  <div
                    key={song.id}
                    className={`rounded-lg border transition-colors ${selectedSongs.includes(song.id) ? "border-jugnu-red bg-jugnu-red/10" : "border-gray-700 hover:border-gray-500"}`}
                    onClick={() => toggleSongSelection(song.id)}
                  >
                    <SongItem
                      id={song.id}
                      title={song.title}
                      artist={song.artist}
                      album={song.album}
                      duration={song.duration}
                      coverImage={song.coverImage}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <Button type="submit" variant="primary" icon={<Plus size={18} />} disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Album"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateAlbum
