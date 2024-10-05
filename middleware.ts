import { type NextRequest } from "next/server";

import { updateSession } from "./app/helpers/supabase/middleware";

export async function middleware(request: NextRequest) {
	await updateSession(request);
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
