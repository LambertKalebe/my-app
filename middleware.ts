'use server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  let hasCookie = request.cookies.has('id')
  response.cookies.set('id', uuidv4())
  if (!hasCookie) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
    matcher: ['/', '/cardsluck/', '/info/', '/leaderboard/'],
  }