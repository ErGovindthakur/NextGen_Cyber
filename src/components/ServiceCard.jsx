"use client";

import { useRouter } from "next/navigation";

export default function ServiceCard({ title, icon, desc, btn, color }) {
  const router = useRouter();

  const handleClick = () => {
    if (title === "Online Form Filling") {
      router.push("/form");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-[#f1f5f9] rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition duration-300"
    >
      <div className="flex justify-center mb-4">
        <img src={icon} alt="service" className="w-20 h-20 object-contain" />
      </div>

      <h3 className="text-sm font-semibold text-gray-800 mb-1">
        {title}
      </h3>

      <p className="text-xs text-gray-500 mb-4 leading-relaxed">
        {desc}
      </p>

      <button className={`text-xs font-semibold px-4 py-2 rounded-md text-white ${color}`}>
        {btn}
      </button>
    </div>
  );
}