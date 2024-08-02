import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the cookie from the request headers
  const cookie = request.headers.get('cookie');
  let userCookie = null;
  const res = NextResponse.next()


  if (cookie) {
    // Parse the cookie
    const parsedCookies = Object.fromEntries(cookie.split('; ').map(c => c.split('=')));
    userCookie = parsedCookies['AuthToken'] || null;
  }

  let isUser = userCookie !== null;

  // If user has already logged in. it will redirect user to direct Dashboard
  if(isUser && (request.nextUrl.pathname === '/signin' || request.nextUrl.pathname === '/signup' ) ){
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If user is Unauthorized .it will redirect user to public lending page (Home Page)
  if (!isUser && (request.nextUrl.pathname === '/dashboard' || request.nextUrl.pathname.startsWith('/dashboard'))) {
    // PROTECT PAGE FROM UNAUTHORIZED ACCESS
    return NextResponse.redirect(new URL("/", request.url));
  }

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Continue to the next middleware or to the requested page
  return res;
}

// Define the matcher to apply this middleware to specific routes
export const config = {
  matcher: ['/dashboard/:path*','/signin','/signup','/api/:path*'],  // Apply middleware to /dashboard and its subroutes
};