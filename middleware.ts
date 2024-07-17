'use server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let hasCookie = request.cookies.has('id')
  if (!hasCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
    matcher: ['/', '/cardsluck/', '/info/', '/leaderboard/'],
  }