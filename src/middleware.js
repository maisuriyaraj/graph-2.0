import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the cookie from the request headers
  const cookie = request.headers.get('cookie');
  let userCookie = null;

  if (cookie) {
    // Parse the cookie
    const parsedCookies = Object.fromEntries(cookie.split('; ').map(c => c.split('=')));
    userCookie = parsedCookies['AuthToken'] || null;
    console.log(parsedCookies)
  }

  let isUser = userCookie !== null;

  // If user has already logged in. it will redirect user to direct Dashboard
  if(isUser && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup' ) ){
    console.log("isAlreadyLoggedIn")
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is Unauthorized .it will redirect user to public lending page (Home Page)
  if (!isUser && (request.nextUrl.pathname === '/dashboard' || request.nextUrl.pathname.startsWith('/dashboard'))) {
    // PROTECT PAGE FROM UNAUTHORIZED ACCESS
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue to the next middleware or to the requested page
  return NextResponse.next();
}

// Define the matcher to apply this middleware to specific routes
export const config = {
  matcher: ['/dashboard/:path*','/signin','/signup'],  // Apply middleware to /dashboard and its subroutes
};