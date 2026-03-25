"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center p-6 text-black">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-6 text-center">
          📄 Online Service Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

          <input name="name" placeholder="Full Name" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />
          <input name="fatherName" placeholder="Father Name" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />

          <input name="motherName" placeholder="Mother Name" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />
          <input name="email" placeholder="Email" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />

          <input name="phone" placeholder="Phone" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />
          <input name="aadhaar" placeholder="Aadhaar" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />

          <input name="pan" placeholder="PAN" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />

          <input name="city" placeholder="City" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />
          <input name="state" placeholder="State" onChange={handleChange} className="input outline-none border border-black rounded-[3px] px-3 py-2" />

          <textarea
            name="address"
            placeholder="Full Address"
            onChange={handleChange}
            className="col-span-2 input outline-none border border-black rounded-[3px] px-3 py-2"
          />

          {/* File Uploads */}
          <div className="col-span-2 grid grid-cols-3 gap-4">

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

          <button className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
            Submit Form 🚀
          </button>

        </form>
      </div>
    </div>
  );
}