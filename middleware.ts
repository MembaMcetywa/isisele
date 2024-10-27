import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "./app/helpers/supabase/middleware";

export async function middleware(request: NextRequest) {
	const { supabase } = await updateSession(request);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (
		!user &&
		!request.nextUrl.pathname.startsWith("/login") &&
		!request.nextUrl.pathname.startsWith("/register") &&
		request.nextUrl.pathname.startsWith("/dashboard")
	) {
		// no user, potentially respond by redirecting the user to the login page
		return NextResponse.redirect(new URL("/login", request.url));
	}

	if (
		user &&
		(request.nextUrl.pathname.startsWith("/login") ||
			request.nextUrl.pathname.startsWith("/register"))
	) {
		// user exists, potentially respond by redirecting the user to the home page
		return NextResponse.redirect(new URL("/", request.url));
	}
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
