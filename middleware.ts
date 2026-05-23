import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(
    request: NextRequest,
) {
    const token =
        request.cookies.get('token');

    const pathname =
        request.nextUrl.pathname;

    // 🔒 ADMIN
    if (
        pathname.startsWith('/admin')
    ) {
        if (!token) {
            return NextResponse.redirect(
                new URL(
                    '/login',
                    request.url,
                ),
            );
        }
    }

    // 🔒 OWNER
    if (
        pathname.startsWith('/owner')
    ) {
        if (!token) {
            return NextResponse.redirect(
                new URL(
                    '/login',
                    request.url,
                ),
            );
        }
    }

    // 🔒 USER
    if (
        pathname.startsWith(
            '/my-bookings',
        )
    ) {
        if (!token) {
            return NextResponse.redirect(
                new URL(
                    '/login',
                    request.url,
                ),
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/owner/:path*',
        '/my-bookings/:path*',
    ],
};