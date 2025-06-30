"use client";
import { useAuth } from "@/contexts/AuthContext";

const Page = () => {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!user) {
		return <div>Please log in to access the dashboard.</div>;
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome, {user.name || user.email}!</p>
		</div>
	);
};

export default Page;
