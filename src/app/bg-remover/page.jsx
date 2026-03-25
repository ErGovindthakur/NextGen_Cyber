"use client";

import { useState } from "react";
import { removeBackground } from "@imgly/background-removal";
import { useRouter } from "next/navigation";

export default function BgRemoverPage() {
  const router = useRouter();

  const [original, setOriginal] = useState(null);
  const [processed, setProcessed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    setOriginal(URL.createObjectURL(file));
    setLoading(true);

    try {
      const blob = await removeBackground(file);
      const url = URL.createObjectURL(blob);
      setProcessed(url);
    } catch (err) {
      console.error(err);
      alert("Error removing background");
    }

    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8153FB] to-indigo-300 text-white">
      
      {/* 🔥 TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-md border-b border-white/20">
        <button
          onClick={() => router.push("/")}
          className="text-sm bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition"
        >
          ⬅ Home
        </button>

        <h2 className="font-semibold tracking-wide">
          AI Tools
        </h2>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center px-6 py-10">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Remove Image Background ✨
        </h1>
        <p className="text-sm text-gray-200 mb-8 text-center">
          100% Automatic • Free • High Quality
        </p>

        {/* UPLOAD BOX */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`w-full max-w-xl p-10 rounded-2xl text-center transition-all duration-300
          ${dragging 
            ? "bg-white/20 border-2 border-dashed border-white scale-105" 
            : "bg-white/10 border border-white/20"
          } backdrop-blur-lg shadow-xl`}
        >
          <p className="mb-4 text-gray-200">
            Drag & Drop your image here
          </p>

          <label className="cursor-pointer inline-block bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition hover:scale-105">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleUpload(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {/* LOADER */}
        {loading && (
          <div className="mt-8 flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm">Removing background...</p>
          </div>
        )}

        {/* PREVIEW */}
        {(original || processed) && (
          <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-5xl">
            
            {original && (
              <div className="bg-white text-black p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
                <p className="text-sm font-semibold mb-2">Original</p>
                <img src={original} className="rounded-lg max-h-80 mx-auto" />
              </div>
            )}

            {processed && (
              <div className="bg-white text-black p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
                <p className="text-sm font-semibold mb-2">Background Removed</p>
                <div className="bg-[url('/checker.png')] bg-cover p-2 rounded-lg">
                  <img src={processed} className="rounded-lg max-h-80 mx-auto" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        {processed && (
          <div className="flex gap-4 mt-10 flex-wrap justify-center">
            
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = processed;
                link.download = "bg-removed.png";
                link.click();
              }}
              className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition"
            >
              ⬇ Download
            </button>

            <button
              onClick={() => {
                setOriginal(null);
                setProcessed(null);
              }}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition"
            >
              🔄 Try Another
            </button>

          </div>
        )}
      </div>
    </div>
  );
}