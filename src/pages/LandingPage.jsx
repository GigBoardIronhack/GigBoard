import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        src="../public/0307.mp4"
      >
        
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="text-7xl font-bold mb-4">Welcome to GigBoard</h1>
        <p className="text-lg mb-6">Discover, connect, and book gigs effortlessly.</p>
        <Link to="/register">

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition">
          Get Started
        </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
