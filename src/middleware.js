"use client";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/register"];

export default async function middleware(req) {
	const path = req.nextUrl.pathname;

	const isProtected = protectedRoutes.includes(path);
	const isPublic = publicRoutes.includes(path);

	const user = await fetch(`${process.env.NEXT_PUBLIC_API}/user`);

	if (user) {
		console.log("authenticated");
	} else if (!user) {
		console.log("not authenticated");
	}
}
