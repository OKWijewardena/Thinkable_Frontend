import { NextResponse } from "next/server";

export function middleware(request) {
  // Check for the token in cookies
  const token = request.cookies.get("token");

  // Redirect unauthenticated users to the login page
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow authenticated requests to proceed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/index-2/:path*","/event/:path*","/contact/:path*","/event-details/:path*","/host/:path*"], // Protect `/host` and all its subpaths
};
