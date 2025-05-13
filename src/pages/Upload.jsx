"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SideNavigation from "../components/SideNavigation"
import Button from "../components/Button"
import { UploadIcon, Music, ImageIcon } from "lucide-react"
import { usePlayer } from "@/context/PlayerContext"
import { useAuth } from "../context/AuthContext"
import { toast } from "@/components/ui/sonner"

const Upload = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addSong } = usePlayer()

  useEffect(() => {
    // Redirect if not artist
    if (!user || user.role !== "artist") {
      navigate("/login")
    }
  }, [user, navigate])

  const [songName, setSongName] = useState("")
  const [artist, setArtist] = useState("")
  const [album, setAlbum] = useState("")
  const [genre, setGenre] = useState("")
  const [songFile, setSongFile] = useState(null)
  const [coverImage, setCoverImage] = useState(null)
  const [previewCover, setPreviewCover] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSongFileChange = (e) => {
    setSongFile(e.target.files[0])
  }

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

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!songName || !genre || !songFile) {
      toast.error("Please fill in all required fields and upload a song file")
      return
    }

    setIsSubmitting(true)

    // In a real app, you would upload the files to a server
    // For demo, we'll simulate the upload with a delay
    setTimeout(() => {
      // Add song to library with pending status
      const newSong = addSong({
        songName,
        artist: user.name,
        artistId: user.id,
        album,
        genre,
        coverImageUrl: previewCover,
        status: "pending",
        uploadDate: new Date().toISOString().split("T")[0],
      })

      setIsSubmitting(false)
      toast.success("Song uploaded successfully! Waiting for admin approval.")

      // Reset form
      setSongName("")
      setArtist("")
      setAlbum("")
      setGenre("")
      setSongFile(null)
      setCoverImage(null)
      setPreviewCover(null)

      // Navigate to dashboard
      navigate("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-jugnu-navy text-white">
      <SideNavigation activePath="/upload" />

      <div className="pl-16 pr-4">
        <div className="max-w-3xl mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8 animate-fade-in">Upload New Song</h1>

          <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Song Name</label>
                  <input
                    type="text"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-4 py-2 text-white focus:border-jugnu-pink focus:outline-none transition-colors"
                    placeholder="Enter song name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Artist</label>
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-4 py-2 text-white focus:border-jugnu-pink focus:outline-none transition-colors"
                    placeholder="Enter artist name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Album (Optional)</label>
                  <input
                    type="text"
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                    className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-4 py-2 text-white focus:border-jugnu-pink focus:outline-none transition-colors"
                    placeholder="Enter album name"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-4 py-2 text-white focus:border-jugnu-pink focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select Genre</option>
                    <option value="pop">Pop</option>
                    <option value="rock">Rock</option>
                    <option value="hiphop">Hip Hop</option>
                    <option value="rnb">R&B</option>
                    <option value="jazz">Jazz</option>
                    <option value="electronic">Electronic</option>
                    <option value="classical">Classical</option>
                    <option value="country">Country</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2">Song File</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-md p-6 text-center hover:border-jugnu-pink transition-colors">
                    <input
                      type="file"
                      onChange={handleSongFileChange}
                      className="hidden"
                      id="song-file"
                      accept="audio/*"
                      required
                    />
                    <label htmlFor="song-file" className="cursor-pointer">
                      <Music size={48} className="mx-auto mb-3 text-gray-400" />
                      <p className="text-gray-400 mb-2">Click to upload MP3 file</p>
                      <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
                      {songFile && <p className="mt-2 text-sm text-green-400">{songFile.name}</p>}
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Cover Image (Optional)</label>
                  <div className="border-2 border-dashed border-gray-700 rounded-md p-6 text-center relative hover:border-jugnu-pink transition-colors">
                    <input
                      type="file"
                      onChange={handleCoverImageChange}
                      className="hidden"
                      id="cover-image"
                      accept="image/*"
                    />
                    {previewCover ? (
                      <div>
                        <img
                          src={previewCover || "/placeholder.svg"}
                          alt="Cover preview"
                          className="mx-auto h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="mt-2 text-xs text-red-400 hover:text-red-300"
                          onClick={() => {
                            setCoverImage(null)
                            setPreviewCover(null)
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <label htmlFor="cover-image" className="cursor-pointer">
                        <ImageIcon size={48} className="mx-auto mb-3 text-gray-400" />
                        <p className="text-gray-400 mb-2">Click to upload cover image</p>
                        <p className="text-xs text-gray-500">JPG, PNG or GIF (max 2MB)</p>
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" variant="primary" icon={<UploadIcon size={18} />} disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </div>
                ) : (
                  "Upload Song"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Upload
