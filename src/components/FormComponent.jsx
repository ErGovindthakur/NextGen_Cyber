"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FormComponent() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    email: "",
    phone: "",
    aadhaar: "",
    pan: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    service: "Online Form Filling",
    file: null,
    userPhoto: null,
    userSign: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    const res = await fetch("/api/form-submit", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Error submitting form ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">

      {/* 🔥 HEADER NAV */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center">

        <h2 className="text-xl font-bold text-gray-800">
          📄 Fill Your Form
        </h2>

        <div className="flex gap-3">

          <Link href="/">
            <button className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
              🏠 Home
            </button>
          </Link>

          <Link href="/dashboard">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow hover:bg-black transition">
              📊 Dashboard
            </button>
          </Link>

        </div>

      </div>

      {/* 🔥 FORM CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 text-black">

          <input name="name" placeholder="Full Name" onChange={handleChange} className="input border p-2 rounded-md" />
          <input name="fatherName" placeholder="Father Name" onChange={handleChange} className="input border p-2 rounded-md" />

          <input name="motherName" placeholder="Mother Name" onChange={handleChange} className="input border p-2 rounded-md" />
          <input name="email" placeholder="Email" onChange={handleChange} className="input border p-2 rounded-md" />

          <input name="phone" placeholder="Phone" onChange={handleChange} className="input border p-2 rounded-md" />
          <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="input border p-2 rounded-md" />

          <input name="pan" placeholder="PAN" onChange={handleChange} className="input border p-2 rounded-md" />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input border p-2 rounded-md" />

          <input name="city" placeholder="City" onChange={handleChange} className="input border p-2 rounded-md" />
          <input name="state" placeholder="State" onChange={handleChange} className="input border p-2 rounded-md" />

          <textarea
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            className="col-span-2 border p-2 rounded-md"
          />

          {/* 📂 FILE UPLOADS */}
          <div className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <label className="text-sm font-medium">Additional Document</label>
              <input type="file" name="file" onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm font-medium">Upload Photo</label>
              <input type="file" name="userPhoto" onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm font-medium">Upload Signature</label>
              <input type="file" name="userSign" onChange={handleChange} />
            </div>

          </div>

          {/* 🔥 SUBMIT */}
          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mt-4">
            Submit Form 🚀
          </button>

        </form>
      </div>
    </div>
  );
}