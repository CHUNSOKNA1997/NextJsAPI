import "server-only";

import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(req) {
	try {
		const { userId } = await req.json();
		if (!userId) throw new Error("userId is required");

		await createSession(userId);

		return NextResponse.json({ message: "Session created" });
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error", message: error.message },
			{ status: 500 }
		);
	}
}
