"use client";

import type { NextRequest } from 'next/server';
import { auth } from './app/firebase/config';
 
export function middleware(request: NextRequest) {
 
  if (auth.currentUser === null && request.nextUrl.pathname.startsWith('/invoice')) {
    return Response.redirect(new URL('/', request.url))
  }
 
  if (auth.currentUser === null && request.nextUrl.pathname.startsWith('/add-item')) {
    return Response.redirect(new URL('/', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}