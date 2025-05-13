"use client"

import { useState } from "react"
import SideNavigation from "../components/SideNavigation"
import Button from "../components/Button"
import { User, Mail, Phone, Edit2, Save } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { toast } from "@/components/ui/sonner"

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || "Aditya Singh",
    email: user?.email || "aditya@example.com",
    phone: user?.phone || "+91 98765 43210",
    bio:
      user?.bio ||
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae neque at nunc fringilla condimentum.",
    profileImage: user?.profileImage || "/Lead-image.svg",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          profileImage: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    setIsSubmitting(true)

    // Update profile using auth context
    updateProfile(profile)

    // Show success message and exit edit mode
    setTimeout(() => {
      setIsSubmitting(false)
      setIsEditing(false)
      toast.success("Profile updated successfully")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-jugnu-pattern text-white">
      <SideNavigation activePath="/profile" />

      <div className="pl-16 pr-4">
        <div className="max-w-4xl mx-auto py-8">
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Artist Profile</h1>

            <Button
              variant={isEditing ? "primary" : "secondary"}
              icon={isEditing ? <Save size={18} /> : <Edit2 size={18} />}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={isSubmitting}
              className="transform transition-transform hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </div>
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Edit Profile"
              )}
            </Button>
          </div>

          <div className="bg-jugnu-dark/50 rounded-xl p-6 animate-slide-up">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden">
                  <img
                    src={profile.profileImage || "/placeholder.svg"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                    <input
                      type="file"
                      id="profile-image"
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                    <label
                      htmlFor="profile-image"
                      className="cursor-pointer text-center text-sm text-white hover:text-jugnu-red transition-colors"
                    >
                      <Edit2 size={24} className="mx-auto mb-2" />
                      Change Photo
                    </label>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-3 py-2 focus:border-jugnu-pink focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex items-center">
                      <User size={18} className="text-gray-500 mr-2" />
                      <span>{profile.name}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-3 py-2 focus:border-jugnu-pink focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-500 mr-2" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Phone</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-3 py-2 focus:border-jugnu-pink focus:outline-none transition-colors"
                    />
                  ) : (
                    <div className="flex items-center">
                      <Phone size={18} className="text-gray-500 mr-2" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-1">Bio</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      className="w-full bg-jugnu-dark border border-gray-700 rounded-md px-3 py-2 h-24 focus:border-jugnu-pink focus:outline-none transition-colors"
                    />
                  ) : (
                    <p className="text-gray-300">{profile.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 animate-slide-up">
            <h2 className="text-2xl font-bold mb-6">Statistics</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-jugnu-dark/50 rounded-xl p-6 text-center transform transition-transform hover:scale-105">
                <div className="text-4xl font-bold text-jugnu-red mb-2">64</div>
                <div className="text-gray-400">Total Songs</div>
              </div>

              <div className="bg-jugnu-dark/50 rounded-xl p-6 text-center transform transition-transform hover:scale-105">
                <div className="text-4xl font-bold text-jugnu-red mb-2">12.5k</div>
                <div className="text-gray-400">Total Plays</div>
              </div>

              <div className="bg-jugnu-dark/50 rounded-xl p-6 text-center transform transition-transform hover:scale-105">
                <div className="text-4xl font-bold text-jugnu-red mb-2">2.3k</div>
                <div className="text-gray-400">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
