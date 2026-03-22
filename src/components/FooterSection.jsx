// components/FooterSection.jsx

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] text-white pt-12 pb-6 px-6">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LEFT - BRAND */}
        <div>
          <h2 className="text-xl font-bold mb-3">XYZ Cyber Cafe</h2>
          <p className="text-sm opacity-80 leading-relaxed">
            Your trusted partner for all online services. Fast, secure and reliable solutions at one place.
          </p>

          {/* Quote */}
          <p className="mt-4 text-xs italic opacity-70">
            Simplifying your digital tasks, one click at a time
          </p>
        </div>

        {/* MIDDLE - CONTACT */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>

          <p className="text-sm opacity-80 mb-4">
            Need help? Reach out anytime.
          </p>

          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md transition">
              <FaWhatsapp /> WhatsApp Us
            </button>

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
              <FaPhoneAlt /> Call Us
            </button>
          </div>
        </div>

        {/* RIGHT - SOCIAL */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>

          <div className="flex gap-4 text-lg">

            <a
              href="#"
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
            >
              <FaTwitter />
            </a>

            <a
              href="mailto:your@email.com"
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition"
            >
              <FaEnvelope />
            </a>

          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} XYZ Cyber Cafe. All rights reserved.
      </div>
    </footer>
  );
}