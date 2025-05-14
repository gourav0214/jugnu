// "use client"

// import { Link } from "react-router-dom"
// import Logo from "../components/Logo"
// import { useAuth } from "@/context/AuthContext"

// const Index = () => {
//   const { user } = useAuth()

//   return (
//     <div className="min-h-screen bg-jugnu-navy text-white">
//       {/* Header/Navigation */}
//       <header className="border-b border-white/10">
//         <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
//           <Logo size="medium" />

//           <nav className="hidden md:flex items-center space-x-8">
//             <a href="#products" className="text-white hover:text-gray-300 transition-colors">
//               Products
//             </a>
//             <a href="#solutions" className="text-white hover:text-gray-300 transition-colors">
//               Solutions
//             </a>
//             <a href="#community" className="text-white hover:text-gray-300 transition-colors">
//               Community
//             </a>
//             <a href="#resources" className="text-white hover:text-gray-300 transition-colors">
//               Resources
//             </a>
//             <a href="#pricing" className="text-white hover:text-gray-300 transition-colors">
//               Pricing
//             </a>
//             <a href="#contact" className="text-white hover:text-gray-300 transition-colors">
//               Contact
//             </a>
//           </nav>

//           <div className="flex items-center space-x-4">
//             {user ? (
//               <Link
//                 to="/dashboard"
//                 className="px-4 py-2 bg-white text-jugnu-navy rounded-md hover:bg-gray-200 transition-colors"
//               >
//                 Dashboard
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 text-white bg-transparent border border-white/20 rounded-md hover:bg-white/10 transition-colors"
//                 >
//                   Sign in
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-4 py-2 bg-white text-jugnu-navy rounded-md hover:bg-gray-200 transition-colors"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="py-20 text-center animate-fade-in">
//         <div className="max-w-3xl mx-auto px-4">
//           <h1 className="text-6xl font-bold gradient-text mb-8 animate-pulse-scale">JUGNU</h1>
//           <p className="text-xl text-gray-300 mb-12">Gaane Gungunate Raho..</p>

//           <div className="flex justify-center gap-4">
//             <Link
//               to={user ? "/dashboard" : "/login"}
//               className="px-6 py-3 bg-white text-jugnu-navy rounded-md hover:bg-gray-200 font-medium transition-transform hover:scale-105"
//             >
//               {user ? "Go to Dashboard" : "Start Creating"}
//             </Link>
//             <Link
//               to={user ? "/upload" : "/register"}
//               className="px-6 py-3 bg-jugnu-dark text-white rounded-md hover:bg-opacity-80 font-medium transition-transform hover:scale-105"
//             >
//               {user ? "Upload Music" : "Explore Music"}
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Features Grid */}
//       <section className="py-16 bg-jugnu-dark/50 animate-slide-up">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-gray-800/20 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
//               <img
//                 src="/Lead-image.svg"
//                 alt="JUGNU Platform Feature"
//                 className="w-full h-64 object-cover"
//               />
//             </div>
//             <div className="bg-gray-800/20 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
//               <img
//                 src="/Lead-image.svg"
//                 alt="JUGNU Platform Feature"
//                 className="w-full h-64 object-cover"
//               />
//             </div>
//           </div>

//           <div className="mt-20">
//             <h2 className="text-2xl font-bold mb-12">Why Choose JUGNU</h2>
//             <p className="text-gray-400 mb-4">The ultimate platform for artists and music lovers</p>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//               {[
//                 {
//                   num: 1,
//                   title: "Share Your Music",
//                   text: "Upload and share your music with millions of listeners worldwide. Reach new audiences and grow your fanbase.",
//                 },
//                 {
//                   num: 2,
//                   title: "Monetize Your Art",
//                   text: "Earn from your creativity with our fair and transparent revenue sharing model for artists.",
//                 },
//                 {
//                   num: 3,
//                   title: "Connect with Fans",
//                   text: "Build meaningful relationships with your listeners through our interactive platform features.",
//                 },
//               ].map((item) => (
//                 <div key={item.num} className="mb-8 transform transition-transform hover:scale-105">
//                   <div className="flex items-center mb-4">
//                     <div className="w-8 h-8 bg-jugnu-pink rounded-full flex items-center justify-center mr-3">
//                       <span className="text-white font-medium">{item.num}</span>
//                     </div>
//                     <h3 className="text-xl font-medium">{item.title}</h3>
//                   </div>
//                   <p className="text-gray-400">{item.text}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//               {[
//                 {
//                   num: 4,
//                   title: "Powerful Analytics",
//                   text: "Gain insights into your audience with detailed analytics and performance metrics.",
//                 },
//                 {
//                   num: 5,
//                   title: "Seamless Streaming",
//                   text: "Enjoy high-quality music streaming with our optimized platform.",
//                 },
//                 {
//                   num: 6,
//                   title: "Artist Community",
//                   text: "Join a thriving community of artists, collaborate, and grow together.",
//                 },
//               ].map((item) => (
//                 <div key={item.num} className="mb-8 transform transition-transform hover:scale-105">
//                   <div className="flex items-center mb-4">
//                     <div className="w-8 h-8 bg-jugnu-pink rounded-full flex items-center justify-center mr-3">
//                       <span className="text-white font-medium">{item.num}</span>
//                     </div>
//                     <h3 className="text-xl font-medium">{item.title}</h3>
//                   </div>
//                   <p className="text-gray-400">{item.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-jugnu-dark py-16 border-t border-white/10">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             <div>
//               <Logo size="medium" />
//               <div className="flex items-center mt-6 space-x-4">
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path
//                       fillRule="evenodd"
//                       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </a>
//                 <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
//                     <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
//                   </svg>
//                 </a>
//               </div>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium mb-4">Use cases</h3>
//               <ul className="space-y-3">
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     For Artists
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     For Labels
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     For Producers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     For Music Schools
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     For Events
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     For Studios
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="text-lg font-medium mb-4">Explore</h3>
//               <ul className="space-y-3">
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     Genre
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     Artists
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     Albums
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     Charts
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     New Releases
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                     Events
//                   </a>
//                 </li>
//               </ul>
//             </div>

          //   <div>
          //     <h3 className="text-lg font-medium mb-4">Resources</h3>
          //     <ul className="space-y-3">
          //       <li>
          //         <a href="#" className="text-gray-400 hover:text-white transition-colors">
          //           Blog
          //         </a>
          //       </li>
          //       <li>
          //         <a href="#" className="text-gray-400 hover:text-white transition-colors">
          //           Tutorials
          //         </a>
          //       </li>
          //       <li>
          //         <a href="#" className="text-gray-400 hover:text-white transition-colors">
          //           Help Center
          //         </a>
          //       </li>
          //       <li>
          //         <a href="#" className="text-gray-400 hover:text-white transition-colors">
          //           API Docs
          //         </a>
          //       </li>
          //       <li>
          //         <a href="#" className="text-gray-400 hover:text-white transition-colors">
          //           Press Kit
          //         </a>
          //       </li>
          //       <li>
          //         <a href="#" className="text-gray-400 hover:text-white transition-colors">
          //           Contact Support
          //         </a>
          //       </li>
          //     </ul>
          //   </div>
          // </div>

//           <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
//             <p>© 2023 JUGNU Music. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   )
// }

// export default Index


import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { Music, Headphones, Radio, Mic2, Play, Heart } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";

const Index = () => {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const deploymentDate = new Date();
  deploymentDate.setDate(deploymentDate.getDate() + 11); // Set target date to 11 days from now

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-jugnu-navy to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="music-notes-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="floating-note"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`
              }}
            >
              <Music className="text-jugnu-orange/20" size={20} />
            </div>
          ))}
        </div>
        <div className="gradient-orb top-20 left-20" />
        <div className="gradient-orb bottom-20 right-20" />
        <div className="gradient-orb top-1/2 right-1/3" />
      </div>

      {/* Header/Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="medium" className="animate-pulse-slow" />

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="nav-link group">
              <Headphones className="inline-block mr-2 group-hover:text-jugnu-cyan" size={18} />
              Features
            </a>
            <a href="#discover" className="nav-link group">
              <Radio className="inline-block mr-2 group-hover:text-jugnu-pink" size={18} />
              Discover
            </a>
            <a href="#community" className="nav-link group">
              <Mic2 className="inline-block mr-2 group-hover:text-jugnu-orange" size={18} />
              Community
            </a>
          </nav>

          {/* <div className="flex items-center space-x-4">
            {user ? (
              <Link
                to="/dashboard"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-jugnu-orange via-jugnu-pink to-jugnu-cyan hover:opacity-90 transition-opacity"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-jugnu-orange via-jugnu-pink to-jugnu-cyan hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            )}
          </div> */}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              {/* Countdown Timer */}
              <CountdownTimer targetDate={deploymentDate} />
              <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text animate-gradient">
                Your Music,
                <br />
                Your Way
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Share your music with the world. Connect with fans and fellow artists.
                Start your musical journey today.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Link to="/login">
                {/* <button className="px-8 py-3 rounded-full bg-gradient-to-r from-jugnu-orange to-jugnu-pink hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Play size={20} />
                  Start Listening
                </button>
                </Link>
                <Link to="/register">
                <button className="px-8 py-3 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors flex items-center gap-2">
                  <Heart size={20} />
                  Join Community
                </button> */}
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/login-artist.svg"
                  alt="Artist"
                  className="w-full max-w-lg mx-auto rounded-2xl shadow-lg shadow-black/20 "
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-jugnu-orange/20 via-jugnu-pink/20 to-jugnu-cyan/20 blur-3xl" />
              
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 mt-20 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">For Music Professionals</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    For Artists
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    For Labels
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    For Producers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    For Music Schools
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Explore</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Genre
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Artists
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Albums
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Charts
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    API Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          

          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
            <p>© 2023 JUGNU Music. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
