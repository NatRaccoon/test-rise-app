import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, locales } from './config';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if locale cookie exists
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;

if (!localeCookie || !locales.includes(localeCookie as "en" | "de")) {
    // Set default locale cookie if missing or invalid
    response.cookies.set('NEXT_LOCALE', defaultLocale);
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|.*\\..*).*)'], // avoid static files
};
