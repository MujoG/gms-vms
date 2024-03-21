import { NextRequest, NextResponse } from "next/server";
import { decodeAuth } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("user-token")?.value;
  const jessintoken = req.cookies.get("jessin-token")?.value;

  console.log("mujo");

  const decodedToken =
    token &&
    (await decodeAuth(token).catch((err) => {
      console.log(err);
    }));

  const decodedJessinToken =
    jessintoken &&
    (await decodeAuth(jessintoken).catch((err) => {
      console.log(err);
    }));

  // console.log("Decoded Token:", decodedToken);

  // if (req.nextUrl.pathname.startsWith("/login") && !decodedToken) {
  //   return;
  // }

  // if (decodedToken) {
  //   // console.log("Token created at:", new Date(decodedToken.nbf * 1000));
  //   // console.log("Token expires at:", new Date(decodedToken.exp * 1000));

  //   const currentTime = Math.floor(Date.now() / 1000);
  //   if (currentTime > decodedToken.exp) {
  //     console.log("Token is expired.");
  //     // return NextResponse.json({ message: "Auth required" }, { status: 401 });
  //     // return NextResponse.json({ error: "Token expired" })
  //     return NextResponse.redirect(new URL("/expired", req.url));
  //   }
  // }

  // if (!decodedToken) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  if (!decodedJessinToken) {
    return NextResponse.redirect(new URL("/nojessintoken", req.url));
  }

  if (decodedJessinToken) {
    return NextResponse.redirect(new URL("/jessintoken", req.url));
  }
}

export const config = {
  matcher: ["/dashboard", "/login", "/plans", "/analytics", "/projekt"],
};
