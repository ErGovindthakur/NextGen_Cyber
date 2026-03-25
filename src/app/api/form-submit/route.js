import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!existingUser) {
    return new Response("User not found", { status: 404 });
  }

  await prisma.form.create({
    data: {
      name: formData.get("name"),
      fatherName: formData.get("fatherName"),
      motherName: formData.get("motherName"),

      email: formData.get("email"),
      phone: formData.get("phone"),
      aadhaar: formData.get("aadhaar"),
      pan: formData.get("pan"),

      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
      pincode: formData.get("pincode"),

      service: formData.get("service"),

      file: formData.get("file")?.name || "",
      userPhoto: formData.get("userPhoto")?.name || "",
      userSign: formData.get("userSign")?.name || "",

      userId: existingUser.id,
    },
  });

  return Response.json({ success: true });
}