"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "flowbite-react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function Navbar() {
	const { user, loading, logout } = useAuth();
	const router = useRouter();
	/**
	 * Handle logout
	 */
	const logoutCallback = async () => {
		try {
			await axios.post("/logout");
			Cookies.remove("auth_token");
			toast.success("Logout successful!");

			if (logout) {
				logout();
			}

			router.push("/login");
		} catch (err) {
			console.error("Logout error:", err);
			toast.error("Logout failed!");
			Cookies.remove("auth_token");
		}
	};
	return (
		// Navbar component
		<nav className="fixed w-full text-white z-10">
			{loading ? (
				<div className="h-screen flex justify-center items-center">
					<Spinner color="success" aria-label="Success spinner example" />
				</div>
			) : (
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<div className="text-2xl font-bold">Product - MGN</div>
						</div>
						<div className="flex items-center space-x-7">
							<Link
								href="/dashboard"
								className="hover:text-blue-400 hover:underline"
							>
								Dashboard
							</Link>
							<div className="space-x-7">
								{user ? (
									// Show user info or logout when authenticated
									<button
										onClick={() => {
											logoutCallback();
										}}
										className="hover:underline hover:text-blue-500 hover:cursor-pointer"
									>
										Logout
									</button>
								) : (
									// Show login/register when not authenticated
									<>
										<Link
											href="/login"
											className="hover:text-blue-400 hover:underline"
										>
											Login
										</Link>
										<Link
											href="/register"
											className="hover:text-blue-400 hover:underline"
										>
											Register
										</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
