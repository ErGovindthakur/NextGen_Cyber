import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { format } from "date-fns";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user) {
    return <div className="p-10">Unauthorized 🔐</div>;
  }

  if (user.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL) {
    return <div className="p-10 text-red-500">Access Denied 🚫</div>;
  }

  const forms = await prisma.form.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 🔥 STATS
  const total = forms.length;
  const approved = forms.filter(f => f.status === "APPROVED").length;
  const pending = forms.filter(f => f.status === "PENDING").length;
  const rejected = forms.filter(f => f.status === "REJECTED").length;

  // 🔥 GRAPH DATA (last 7 days)
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const count = forms.filter(f =>
      format(new Date(f.createdAt), "yyyy-MM-dd") ===
      format(date, "yyyy-MM-dd")
    ).length;

    return {
      date: format(date, "dd MMM"),
      count,
    };
  }).reverse();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-8">

      {/* 🔥 HEADER */}
      <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-700">
        🚀 Admin Dashboard
      </h1>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <Card title="Total Forms" value={total} color="bg-blue-500" />
        <Card title="Approved" value={approved} color="bg-green-500" />
        <Card title="Pending" value={pending} color="bg-yellow-500" />
        <Card title="Rejected" value={rejected} color="bg-red-500" />

      </div>

      {/* 🔥 GRAPH */}
      <div className="bg-white rounded-xl p-4 shadow mb-8">
        <h2 className="font-semibold mb-4">📊 Submissions (Last 7 Days)</h2>

        <div className="flex items-end gap-3 h-40">
          {last7Days.map((d, i) => (
            <div key={i} className="flex flex-col items-center flex-1">

              <div
                className="bg-blue-500 w-full rounded"
                style={{ height: `${d.count * 20}px` }}
              />

              <span className="text-xs mt-1">{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 FORMS LIST */}
      <div className="space-y-6">

        {forms.map((form) => (
          <div key={form.id} className="bg-white p-4 md:p-6 rounded-xl shadow">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-3">
              <h2 className="text-lg font-bold">{form.name}</h2>

              <span className={`px-3 py-1 rounded text-sm w-fit text-white
                ${form.status === "PENDING" && "bg-yellow-400"}
                ${form.status === "APPROVED" && "bg-green-400"}
                ${form.status === "REJECTED" && "bg-red-400"}
              `}>
                {form.status}
              </span>
            </div>

            {/* DATA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-black">
              <p><b>Email:</b> {form.email}</p>
              <p><b>Phone:</b> {form.phone}</p>
              <p><b>Aadhaar:</b> {form.aadhaar}</p>
              <p><b>PAN:</b> {form.pan}</p>
              <p><b>City:</b> {form.city}</p>
              <p><b>State:</b> {form.state}</p>
            </div>

            {/* FILES */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <a href={form.file} target="_blank" className="text-blue-600">📄 Doc</a>
              <a href={form.userPhoto} target="_blank" className="text-blue-600">🖼 Photo</a>
              <a href={form.userSign} target="_blank" className="text-blue-600">✍️ Sign</a>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3 mt-4">
              <form action={`/api/update-status?id=${form.id}&status=APPROVED`} method="POST">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Approve
                </button>
              </form>

              <form action={`/api/update-status?id=${form.id}&status=REJECTED`} method="POST">
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm">
                  Reject
                </button>
              </form>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

/* 🔥 REUSABLE CARD */
function Card({ title, value, color }) {
  return (
    <div className={`${color} text-white p-4 rounded-xl shadow`}>
      <h3 className="text-sm">{title}</h3>
      <p className="text-xl md:text-2xl font-bold">{value}</p>
    </div>
  );
}