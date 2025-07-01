import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

const protectedRoutes = ["/dashboard", "/"];
const publicRoutes = ["/login", "/register"];

export async function middleware(req) {
	const path = req.nextUrl.pathname;
	const isProtected = protectedRoutes.includes(path);
	const isPublic = publicRoutes.includes(path);

	const authUser = await getAuthUser();
	const userID = authUser?.id;

	if (isProtected && !userID) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	if (isPublic && userID) {
		return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
	}

	return NextResponse.next();
}
