import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";

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

  // 🔥 Upload function
  const uploadFile = async (file) => {
    if (!file) return "";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "nextgen" }, (err, result) => {
          if (err) reject(err);
          else resolve(result.secure_url);
        })
        .end(buffer);
    });
  };

  // 🔥 Upload all files
  const fileUrl = await uploadFile(formData.get("file"));
  const photoUrl = await uploadFile(formData.get("userPhoto"));
  const signUrl = await uploadFile(formData.get("userSign"));

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

      file: fileUrl,
      userPhoto: photoUrl,
      userSign: signUrl,

      userId: existingUser.id,
    },
  });

  return Response.json({ success: true });
}