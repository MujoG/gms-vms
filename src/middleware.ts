import { NextRequest, NextResponse } from "next/server";
import { decodeAuth, verifyAuth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("user-token")?.value;

  const decodedToken =
    token &&
    (await decodeAuth(token).catch((err) => {
      console.log(err);
    }));

  if (req.nextUrl.pathname.startsWith("/login") && !decodedToken) {
    return;
  }

  // if (req.url.includes("/") && decodedToken) {
  //   return NextResponse.redirect(new URL("/analytics", req.url));
  // }

  if (!decodedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login", "/plans", "/analytics", "/projekt"],
};
