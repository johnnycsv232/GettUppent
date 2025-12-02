import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * 🔐 Middleware for Route Protection
 * 
 * Protects admin routes and ensures proper authentication
 * before allowing access to sensitive endpoints.
 */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected admin routes
  const isAdminApiRoute = pathname.startsWith('/api/admin');
  const isAdminPageRoute = pathname.startsWith('/admin');
  const isOpsRoute = pathname.startsWith('/ops');

  // Check for admin routes
  if (isAdminApiRoute || isAdminPageRoute || isOpsRoute) {
    // For API routes, check Authorization header
    if (isAdminApiRoute) {
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { error: 'Unauthorized: Authentication required' },
          { status: 401 }
        );
      }
      
      // Token validation happens in the route handlers via validateAuth
      // This middleware just ensures a token is present
    }
    
    // For page routes, check for auth cookie or redirect to login
    if (isAdminPageRoute || isOpsRoute) {
      // Check for Firebase auth session cookie
      const authCookie = request.cookies.get('__session');
      
      if (!authCookie) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Prevent clickjacking on sensitive pages
  if (isAdminPageRoute || isOpsRoute) {
    response.headers.set('X-Frame-Options', 'DENY');
  }

  return response;
}

export const config = {
  matcher: [
    // Admin API routes
    '/api/admin/:path*',
    // Admin pages
    '/admin/:path*',
    // Operations pages
    '/ops/:path*',
    // Exclude static files and public API routes
    '/((?!_next/static|_next/image|favicon.ico|api/public|api/webhooks|api/booking).*)',
  ],
};
