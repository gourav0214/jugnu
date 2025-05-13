import { Toaster } from "./components/ui/toaster"
import { Toaster as Sonner } from "./components/ui/sonner"
import { TooltipProvider } from "./components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import NotFound from "./pages/NotFound"
import Upload from "./pages/Upload"
import CreateAlbum from "./pages/CreateAlbum"
import Profile from "./pages/Profile"
import Search from "./pages/Search"
import ForgotPassword from "./pages/ForgotPassword"
import AdminDashboard from "./pages/AdminDashboard"
import Artists from "./pages/Artists"
import ArtistProfile from "./pages/ArtistProfile"
import Songs from "./pages/Songs"
import ProtectedRoute from "./components/ProtectedRoute"

const queryClient = new QueryClient()

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {({ user }) => (
                    user.role === "admin" ? <AdminDashboard /> : <Dashboard />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  {({ user }) => (
                    user.role === "artist" ? <Upload /> : <Navigate to="/dashboard" />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-album"
              element={
               <ProtectedRoute>
                  <CreateAlbum />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
               <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route
              path="/songs"
              element={
                <ProtectedRoute>
                  <Songs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/artists"
              element={
                <ProtectedRoute>
                  {({ user }) => (
                    user.role === "admin" ? <Artists /> : <Navigate to="/dashboard" />
                  )}
                </ProtectedRoute>
              }
            />
            <Route
              path="/artist/:id"
              element={
                <ProtectedRoute>
                  {({ user }) => (
                    user.role === "admin" ? <ArtistProfile /> : <Navigate to="/dashboard" />
                  )}
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App
