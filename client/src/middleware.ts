import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = ["/me"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get("sessionToken")?.value;
    //if user haven't logined, user cannot enter private paths
    if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // If user have logined, user cannot enter login/register
    if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
        return NextResponse.redirect(new URL("/me", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [...privatePaths, ...authPaths],
};
