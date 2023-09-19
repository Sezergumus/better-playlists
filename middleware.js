import { NextResponse } from "next/server";

export function middleware(req) {
  // redirect only once
  const token =
    (req.cookies.get("access_token") &&
      req.cookies.get("access_token").value) ||
    "";

  let count = 0;

  if (req.nextUrl.pathname === "/playlists" && !token) {
    if (count === 0) {
      count++;
      return NextResponse.redirect("http://localhost:3000/");
    }
  }

  return NextResponse.next();
}
