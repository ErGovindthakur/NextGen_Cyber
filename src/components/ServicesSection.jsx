// components/ServicesSection.jsx
import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  const services = [
    {
      title: "Online Form Filling",
      icon:"service.png",
      desc: "Railway, SSC, Govt Forms, and more",
      btn: "Fill Form Now",
      color: "bg-yellow-500 hover:bg-yellow-600",
    },
    {
      title: "Document Services",
      icon:"docs.png",
      desc: "Aadhar, PAN Card, Voter ID",
      btn: "Apply Now",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Build Your Resume",
      icon:"print.png",
      desc: "Create a Professional Resume",
      btn: "Create Resume",
      color: "bg-indigo-600 hover:bg-indigo-700",
    },
    {
      title: "image Background Remover",
      icon:"money.png",
      desc: "Get a High quality Image",
      btn: "Get Now",
      color: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <div className="bg-[#eef2f7] py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
        {services.map((item, i) => (
          <ServiceCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}