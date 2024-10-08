import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith('/cp') && !req.auth) {
        return NextResponse.redirect(`${process.env.NEXTAUTH_URL}`);
    }
    if (pathname === "/no-permission" || pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    return NextResponse.next();
})

export const config = {
    matcher: [
        '/',
        '/((?!api|_next/static|_next/image|favicon.ico|img).*)'
    ]
};