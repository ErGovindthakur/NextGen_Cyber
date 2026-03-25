import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    return <div className="p-10 text-center">Login required 🔐</div>;
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
    include: { forms: true },
  });

  const forms = dbUser?.forms || [];

  // 📊 Stats
  const total = forms.length;
  const approved = forms.filter(f => f.status === "APPROVED").length;
  const pending = forms.filter(f => f.status === "PENDING").length;
  const rejected = forms.filter(f => f.status === "REJECTED").length;

  const quotes = [
    "Success is one form away 🚀",
    "Stay consistent, results will follow 💡",
    "Your documents, our responsibility 📄",
    "Every submission brings you closer 🎯",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">

      {/* 🔥 STICKY HEADER */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-50 px-6 py-4 shadow-sm">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              👋 Welcome, {user.firstName}
            </h1>
            <p className="text-gray-600 text-sm mt-1">{randomQuote}</p>
          </div>

          {/* 🔥 ACTION BUTTONS */}
          <div className="flex gap-3">

            <Link href="/">
              <button className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition">
                🏠 Home
              </button>
            </Link>

            <Link href="/form">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                ➕ New Form
              </button>
            </Link>

          </div>

        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-6">

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

          <StatCard title="Total Forms" value={total} color="bg-blue-500" />
          <StatCard title="Approved" value={approved} color="bg-green-500" />
          <StatCard title="Pending" value={pending} color="bg-yellow-500" />
          <StatCard title="Rejected" value={rejected} color="bg-red-500" />

        </div>

        {/* 📄 FORMS LIST */}
        {forms.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-gray-600">
              No forms submitted yet 😅
            </h2>
            <p className="text-gray-400 mt-2">
              Start by filling your first form!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {forms.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border"
              >

                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">
                    {form.service}
                  </h3>

                  <span className={`text-xs px-3 py-1 rounded-full font-medium
                    ${form.status === "APPROVED" && "bg-green-100 text-green-700"}
                    ${form.status === "PENDING" && "bg-yellow-100 text-yellow-700"}
                    ${form.status === "REJECTED" && "bg-red-100 text-red-700"}
                  `}>
                    {form.status}
                  </span>
                </div>

                {/* Info */}
                <p className="text-sm text-gray-600">{form.name}</p>
                <p className="text-sm text-gray-500">{form.email}</p>

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-3">
                  📅 {new Date(form.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* 📊 STAT CARD */
function StatCard({ title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:shadow-md transition">
      <div className={`w-10 h-10 rounded-lg ${color}`} />
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}