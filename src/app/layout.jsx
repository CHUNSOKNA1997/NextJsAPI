import Link from "next/link";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<main>
					<nav className="fixed w-full text-white z-10">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="flex justify-between h-16">
								<div className="flex items-center">
									<div className="text-2xl font-bold ">Product - MGN</div>
								</div>
								<div className="flex items-center space-x-7">
									<Link
										href="/dashboard"
										className="hover:text-blue-400 hover:underline"
									>
										Dashboard
									</Link>
									<div className="space-x-7">
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
									</div>
								</div>
							</div>
						</div>
					</nav>

					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="pt-20 pb-12">
							<AuthProvider>
								{/* Your Navbar and other layout components can go here */}
								{children}
							</AuthProvider>
						</div>
					</div>
				</main>
			</body>
		</html>
	);
}
