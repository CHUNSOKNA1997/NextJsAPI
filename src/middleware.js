import { NextResponse } from "next/server";
import getAuthUser from "./lib/getAuthUser";

export async function middleware(request) {
	const user = await getAuthUser();
	console.log(user);
}
