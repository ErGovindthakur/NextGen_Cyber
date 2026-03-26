// =========================
// 📄 page.jsx
// =========================
"use client";
import { useState } from "react";
// import SidebarForm from "@/components/resume/SidebarForm";
import ResumeCanvas from "@/components/resume/ResumeCanvas";

export default function ResumeBuilder() {
  const [formData, setFormData] = useState({
    education: [],
  });

  const [template, setTemplate] = useState("modern");

  return (
    <div className="flex h-screen">
      {/* LEFT SIDEBAR */}
      {/* <div className="w-[35%] bg-white p-6 overflow-y-auto border-r">
        <SidebarForm
          formData={formData}
          setFormData={setFormData}
          template={template}
          setTemplate={setTemplate}
        />
      </div> */}

      {/* RIGHT CANVAS */}
      <div className="flex-1 bg-gray-200 flex justify-center items-center">
        <ResumeCanvas data={formData} template={template} />
      </div>
    </div>
  );
}