// components/HeroSection.jsx
"use client";

import { FaPhoneAlt, FaFileAlt, FaIdCard, FaCreditCard, FaPrint } from "react-icons/fa";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative text-white overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-right bg-no-repeat"
        style={{ backgroundImage: "url('/hero.png')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a]/90 via-[#3b82f6]/80 to-transparent" />

      {/* Glow Effect */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-500 opacity-30 blur-3xl rounded-full" />

      {/* Navbar */}
      <div className="relative z-10 flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-lg shadow-sm">
        <h1 className="font-bold text-lg text-black">XYZ CYBER CAFE</h1>

        <ul className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <li className="hover:text-blue-600 cursor-pointer">Home</li>
          <li className="hover:text-blue-600 cursor-pointer">About</li>
          <li className="hover:text-blue-600 cursor-pointer">Services</li>
          <li className="hover:text-blue-600 cursor-pointer">Contact</li>
        </ul>

        <div className="flex items-center gap-2 text-sm text-green-600">
          <FaPhoneAlt />
          <span>+91 XXXXX XXXXX</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-24 flex items-center min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">
            Welcome to XYZ Cyber Cafe <br /> Online Services
          </h2>

          <p className="text-base opacity-90">
            Your One-Stop Solution for All Online Tasks
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow-lg transition">
              Get Started
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
              Login
            </button>
          </div>
        </motion.div>
      </div>

      {/* 🔥 Floating Icons (Premium Glass Style) */}

      {/* Document */}
      <motion.div
        className="absolute top-28 right-40 bg-white/20 backdrop-blur-md p-3 rounded-xl text-white text-xl shadow-lg"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <FaFileAlt />
      </motion.div>

      {/* ID Card */}
      <motion.div
        className="absolute top-44 right-16 bg-white/20 backdrop-blur-md p-3 rounded-xl text-white text-xl shadow-lg"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <FaIdCard />
      </motion.div>

      {/* Payment */}
      <motion.div
        className="absolute bottom-40 right-52 bg-white/20 backdrop-blur-md p-3 rounded-xl text-white text-xl shadow-lg"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
      >
        <FaCreditCard />
      </motion.div>

      {/* Print */}
      <motion.div
        className="absolute bottom-28 right-20 bg-white/20 backdrop-blur-md p-3 rounded-xl text-white text-xl shadow-lg"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 4.5 }}
      >
        <FaPrint />
      </motion.div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-[140px]"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,224L80,213.3C160,203,320,181,480,170.7C640,160,800,160,960,181.3C1120,203,1280,245,1360,266.7L1440,288V320H0Z"
          />
        </svg>
      </div>
    </div>
  );
}