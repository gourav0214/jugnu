# JUGNU Music App

JUGNU is a music streaming and sharing platform for artists and music lovers. This application allows artists to upload, share, and manage their music while providing listeners with a seamless music streaming experience.

## Features

- User authentication (login, register, forgot password)
- Music upload and management
- Album creation
- Music player with playlist functionality
- Artist profile management
- Search functionality
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/jugnu-music-app.git
cd jugnu-music-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open your browser and navigate to `http://localhost:5173`

## Demo Credentials

For testing purposes, you can use the following credentials:

- Phone: +91 98765 43210
- Password: password123

## Project Structure

\`\`\`
jugnu/
├── public/             # Static assets
├── src/                # Source files
│   ├── components/     # Reusable components
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # Entry point
├── .gitignore          # Git ignore file
├── DATABASE_INTEGRATION.md # Database integration guide
├── index.html          # HTML entry point
├── package.json        # Project dependencies
├── README.md           # Project documentation
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
\`\`\`

## Database Integration

This demo version uses mock data stored in context providers. For instructions on integrating a real database, please refer to the [DATABASE_INTEGRATION.md](DATABASE_INTEGRATION.md) file.

## Technologies Used

- React.js
- React Router
- Tailwind CSS
- Vite
- Lucide React (for icons)
- React Query

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from various music streaming platforms
- Icons from Lucide React
- UI components inspired by shadcn/ui
