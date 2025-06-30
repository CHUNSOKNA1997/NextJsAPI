import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<main>
					<AuthProvider>
						<Navbar />
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="pt-20 pb-12">{children}</div>
						</div>
						<Toaster position="top-right" />
					</AuthProvider>
				</main>
			</body>
		</html>
	);
}
