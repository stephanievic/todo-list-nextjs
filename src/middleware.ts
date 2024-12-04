import { NextResponse, type NextRequest } from 'next/server'
 
export const config = {
  matcher: ['/home', '/label', '/list/:path*'],
}
 
export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')
  
  console.log('TOKEN: ', token)
  if (!token) {
     return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}