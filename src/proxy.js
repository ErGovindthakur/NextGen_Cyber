// src/proxy.js

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/api/(.*)", // ✅ ADD THIS LINE (CRITICAL)
  ],
};