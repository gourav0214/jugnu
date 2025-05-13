"use client"

import { Link } from "react-router-dom"
import { Home, User, Search, LogOut, Users, Music } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { toast } from "../components/ui/sonner"

const NavItem = ({ icon, label, href, active = false }) => {
  return (
    <Link
      to={href}
      className={`flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all ${
        active ? "bg-jugnu-red text-white" : "text-gray-400 hover:text-white hover:bg-white/10"
      }`}
      title={label}
    >
      {icon}
    </Link>
  )
}

const SideNavigation = ({ activePath }) => {
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    // Redirect to home page
    window.location.href = "/"
  }

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-jugnu-dark\80 flex flex-col items-center pt-6 pb-4 z-10">
      <div className="mb-8">
        <Link to="/">
          <div className="w-10 h-10 animate-pulse hover:animate-spin">
            <img src="symbol.svg" alt="symbol" />
          </div>
        </Link>
      </div>

      <div className="flex flex-col items-center border-[0.5px] rounded-full py-5 px-1">
        <NavItem icon={<Home size={20} />} label="Home" href="/dashboard" active={activePath === "/dashboard"} />
        <NavItem icon={<Music size={20} />} label="Songs" href="/songs" active={activePath === "/songs"} />
        <NavItem icon={<User size={20} />} label="Profile" href="/profile" active={activePath === "/profile"} />
        <NavItem icon={<Search size={20} />} label="Search" href="/search" active={activePath === "/search"} />
        {user?.role === "admin" && (
          <NavItem icon={<Users size={20} />} label="Artists" href="/artists" active={activePath === "/artists"} />
        )}
      </div>

      <div className="mt-auto border-[0.5px] rounded-full py-5 px-1">
        {user?.role === "artist" && (
        <NavItem
          icon={
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
              <path d="M12 3v13"></path>
              <path d="m9 13 3 3 3-3"></path>
              <circle cx="12" cy="21" r="1"></circle>
            </svg>
          }
          label="Upload"
          href="/upload"
          active={activePath === "/upload"}
        />
      )}

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 text-gray-400 hover:text-red-500 hover:bg-white/10 transition-all"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  )
}

export default SideNavigation
