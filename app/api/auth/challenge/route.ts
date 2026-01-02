import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (authHeader) {
        const authValue = authHeader.split(' ')[1]
        const [user, pwd] = atob(authValue).split(':')

        const validUser = process.env.ADMIN_USERNAME || 'admin'
        const validPass = process.env.ADMIN_PASSWORD || '2026'

        if (user === validUser && pwd === validPass) {
            const response = NextResponse.redirect(new URL('/users', request.url))
            response.cookies.set('admin-token', 'authenticated', {
                path: '/',
                httpOnly: true,
                maxAge: 60 * 60 * 24, // 1 day
                sameSite: 'strict',
            })
            return response
        }
    }

    return new NextResponse('Authentication Required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
    })
}
