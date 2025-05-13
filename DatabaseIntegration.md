# JUGNU Music App - Database Integration Guide

This document provides instructions for integrating a database with the JUGNU music application. Follow these steps to replace the mock data with real database connections.

## Table of Contents

1. [Overview](#overview)
2. [Database Schema](#database-schema)
3. [Integration Points](#integration-points)
4. [Authentication Integration](#authentication-integration)
5. [Music Player Integration](#music-player-integration)
6. [File Storage Integration](#file-storage-integration)
7. [Environment Variables](#environment-variables)

## Overview

The JUGNU application currently uses mock data stored in context providers. To integrate a real database, you'll need to replace these mock implementations with actual API calls to your backend.

Recommended database options:
- **Firebase/Firestore**: Easy to set up, good for quick prototyping
- **MongoDB**: Flexible schema, good for document-based data
- **PostgreSQL**: Robust relational database for complex relationships
- **Supabase**: PostgreSQL with built-in authentication and storage

## Database Schema

Here's a suggested database schema for the JUGNU application:

### Users
\`\`\`
users {
  id: string (primary key)
  name: string
  email: string
  phone: string
  password: string (hashed)
  bio: string
  profileImage: string (URL)
  createdAt: timestamp
  updatedAt: timestamp
}
\`\`\`

### Songs
\`\`\`
songs {
  id: string (primary key)
  title: string
  artist: string
  album: string
  genre: string
  duration: string
  status: string (approved, pending, rejected)
  coverImage: string (URL)
  audioUrl: string (URL)
  userId: string (foreign key to users)
  createdAt: timestamp
  updatedAt: timestamp
}
\`\`\`

### Albums
\`\`\`
albums {
  id: string (primary key)
  name: string
  description: string
  coverImage: string (URL)
  userId: string (foreign key to users)
  createdAt: timestamp
  updatedAt: timestamp
}
\`\`\`

### Album_Songs (Many-to-Many Relationship)
\`\`\`
album_songs {
  id: string (primary key)
  albumId: string (foreign key to albums)
  songId: string (foreign key to songs)
}
\`\`\`

### Favorites
\`\`\`
favorites {
  id: string (primary key)
  userId: string (foreign key to users)
  songId: string (foreign key to songs)
  createdAt: timestamp
}
\`\`\`

## Integration Points

The application has two main context providers that need to be updated:

1. `AuthContext.jsx`: Handles user authentication
2. `PlayerContext.jsx`: Manages music playback and song data

## Authentication Integration

Replace the mock authentication in `AuthContext.jsx` with real authentication:

1. Create an API service file (e.g., `src/services/authService.js`):

\`\`\`javascript
// Example using fetch API
export const loginUser = async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Login failed');
  }
  
  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  
  return response.json();
};

// Add other auth methods (logout, update profile, etc.)
\`\`\`

2. Update the `AuthContext.jsx` to use these services:

\`\`\`javascript
// Replace mock functions with real API calls
const login = async (credentials) => {
  setLoading(true);
  try {
    const userData = await loginUser(credentials);
    setUser(userData);
    localStorage.setItem("jugnu_user", JSON.stringify(userData));
    toast.success("Login successful!");
    return true;
  } catch (error) {
    toast.error(error.message || "Invalid credentials");
    return false;
  } finally {
    setLoading(false);
  }
};
\`\`\`

## Music Player Integration

Replace the mock song data in `PlayerContext.jsx` with real API calls:

1. Create a music service file (e.g., `src/services/musicService.js`):

\`\`\`javascript
export const getAllSongs = async () => {
  const response = await fetch('/api/songs');
  
  if (!response.ok) {
    throw new Error('Failed to fetch songs');
  }
  
  return response.json();
};

export const uploadSong = async (songData, audioFile, imageFile) => {
  // Create FormData for file upload
  const formData = new FormData();
  formData.append('title', songData.songName);
  formData.append('artist', songData.artist);
  formData.append('album', songData.album);
  formData.append('genre', songData.genre);
  formData.append('audioFile', audioFile);
  
  if (imageFile) {
    formData.append('coverImage', imageFile);
  }
  
  const response = await fetch('/api/songs', {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload song');
  }
  
  return response.json();
};

// Add other music-related API methods
\`\`\`

2. Update the `PlayerContext.jsx` to use these services:

\`\`\`javascript
// Replace mock functions with real API calls
const [songs, setSongs] = useState([]);

// Fetch songs on mount
useEffect(() => {
  const fetchSongs = async () => {
    try {
      const songsData = await getAllSongs();
      setSongs(songsData);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };
  
  fetchSongs();
}, []);

// Update the getAllSongs function
const getAllSongs = () => {
  return songs;
};

// Update the addSong function
const addSong = async (songData, audioFile, imageFile) => {
  try {
    const newSong = await uploadSong(songData, audioFile, imageFile);
    setSongs(prev => [...prev, newSong]);
    return newSong;
  } catch (error) {
    toast.error("Failed to upload song");
    throw error;
  }
};
\`\`\`

## File Storage Integration

For storing audio files and images, consider using:

1. **Cloud Storage**: AWS S3, Google Cloud Storage, or Firebase Storage
2. **CDN**: Cloudinary, Cloudflare, or similar services for media delivery

Example integration with Firebase Storage:

\`\`\`javascript
import { storage } from './firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFile = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};
\`\`\`

## Environment Variables

Create a `.env` file in the root of your project to store sensitive information:

\`\`\`
# Database
DATABASE_URL=your_database_connection_string

# Authentication
AUTH_SECRET=your_auth_secret_key
JWT_SECRET=your_jwt_secret

# Storage
STORAGE_API_KEY=your_storage_api_key
STORAGE_BUCKET=your_storage_bucket_name

# API
API_URL=your_api_base_url
\`\`\`

Then update your Vite configuration to use these environment variables:

\`\`\`javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  }
});
\`\`\`

## Conclusion

By following this guide, you should be able to replace the mock data in the JUGNU application with real database connections. Remember to implement proper error handling, loading states, and security measures in your production application.

For any questions or issues, please refer to the documentation of your chosen database provider or contact the development team.
