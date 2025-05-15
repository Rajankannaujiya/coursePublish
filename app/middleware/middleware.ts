import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

function getRoleFromToken(token?: string): string | null {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role; 
    } catch {
      return null;
    }
  }

export function middleware(request: NextRequest) {
    const token = request.cookies?.get('token')?.value
    const pathname = request.nextUrl.pathname;

    const userRole = getRoleFromToken(token);
 
    if(pathname.startsWith("/admin") || pathname.includes("/admin")){
        if(!token || userRole !== "ADMIN"){
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    if (pathname.startsWith('/(dashboard)')) {
        if (!token || (userRole !== 'USER' && userRole !== 'ADMIN')) {
          return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
    
}


export const config = {
    matcher: ['/admin/:path*', '/(dashboard)/:path*'],
  };    