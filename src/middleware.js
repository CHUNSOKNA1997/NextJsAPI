import { NextResponse } from "next/server";

export async function middleware(request) {
	const { pathname } = request.nextUrl;
	const tokenCookie = request.cookies.get("auth_token")?.value;

	// Protect authenticated routes
	if (pathname.startsWith("/dashboard")) {
		if (!tokenCookie) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenCookie}`,
				},
			});

			if (!response.ok) {
				return NextResponse.redirect(new URL("/login", request.url));
			}
		} catch (error) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}

	if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
		if (tokenCookie) {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${tokenCookie}`,
					},
				});

				if (response.ok) {
					return NextResponse.redirect(new URL("/dashboard", request.url));
				}
			} catch (error) {
				return NextResponse.next();
			}
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/profile/:path*", "/login", "/register"],
};
