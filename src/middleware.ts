import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPathPrefixes = [
  "/dashboard",
  "/api/research",
  "/api/publications",
  "/api/reviews",
  "/api/notifications",
  "/api/dashboard",
  "/api/reports",
  "/api/scholar"
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isProtected = protectedPathPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) {
    return NextResponse.next();
  }

  if (token) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/research/:path*", "/api/publications/:path*", "/api/reviews/:path*", "/api/notifications/:path*", "/api/dashboard/:path*", "/api/reports/:path*", "/api/scholar/:path*"]
};
