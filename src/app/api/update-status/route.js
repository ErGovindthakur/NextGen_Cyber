import prisma from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { statusEmailTemplate } from "@/lib/emailTemplate";

export async function POST(req) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const status = searchParams.get("status");

  // ✅ Update DB
  const form = await prisma.form.update({
    where: { id },
    data: { status },
  });

  console.log("📌 Form Updated:", form);

  try {
    const emailRes = await resend.emails.send({
      from: "NextGen <onboarding@resend.dev>",
      to: "ergovindthakur@gmail.com",
      subject: `Form Status: ${status}`,
      html: statusEmailTemplate(form.name, status),
    });

    console.log("✅ Email Sent:", emailRes);
  } catch (err) {
    console.error("❌ Email Error:", err);
  }

  return Response.redirect(new URL("/admin", req.url));
}