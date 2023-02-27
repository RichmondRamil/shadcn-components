// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
/* 
    1. We import the default export from the next-auth/middleware package.
    2.  We export a config object with a matcher property that can be an array of strings or regular expressions. 
        In the example above, we use a regular expression to match all paths that start with /private/ or /api/private/.
    3. We export the default export from the next-auth/middleware package. 
    4. All path that match with config will require authentication from the next-auth session
*/
export { default } from 'next-auth/middleware'

export const config = {
    matcher: ['/private/:path*', '/api/private/:path*'],
}
