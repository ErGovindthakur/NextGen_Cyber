// src/app/api/sync-user/route.js

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function POST() {
  const user = await currentUser(); // ✅ USE THIS ONLY

  if (!user) {
    console.log("❌ No user session");
    return new Response("Unauthorized", { status: 401 });
  }

  console.log("✅ userId:", user.id);

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.firstName,
        imageUrl: user.imageUrl,
      },
    });
  }

  return Response.json({ success: true });
}