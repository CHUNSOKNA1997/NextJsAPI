"use client";
import axios from "../../lib/axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { setAuthUser, loading } = useAuth();
	const router = useRouter();

	/**
	 * Handle form submission
	 * @param {} e
	 */
	const submitCallback = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError({});

		try {
			const response = await axios.post("/login", formData);
			const { token, user } = response.data;

			setAuthUser(user, token);

			setFormData({
				email: "",
				password: "",
			});

			router.push("/dashboard");
		} catch (err) {
			setError(err?.response?.data?.errors || {});
			setFormData({
				...formData,
				password: "",
			});
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * Show loading animation */
	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<span className="loading loading-infinity loading-lg" />
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center min-h-screen">
			<main className="max-w-md w-full mx-auto p-6 rounded-lg shadow-md">
				<SparklesText className="text-3xl mb-6">
					Login to your account
				</SparklesText>
				<form onSubmit={submitCallback} className="space-y-4">
					<div className="flex flex-col gap-1">
						<label htmlFor="email" className="text-sm font-medium mb-2">
							Email
						</label>
						<input
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							type="email"
							name="email"
							id="email"
							disabled={isLoading}
							className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
								error.email ? "border-red-500" : ""
							}`}
						/>
						{error.email && (
							<small className="text-sm text-red-500">
								{Array.isArray(error.email) ? error.email[0] : error.email}
							</small>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="password" className="text-sm font-medium mb-2">
							Password
						</label>
						<input
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							type="password"
							name="password"
							id="password"
							disabled={isLoading}
							className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
								error.password ? "border-red-500" : ""
							}`}
						/>
						{error.password && (
							<small className="text-sm text-red-500">
								<ul
									className={`${
										error.password?.length > 1 ? "list-disc pl-4" : ""
									}`}
								>
									{Array.isArray(error.password) ? (
										error.password.map((err, index) => (
											<li key={index}>{err}</li>
										))
									) : (
										<li>{error.password}</li>
									)}
								</ul>
							</small>
						)}
					</div>

					{/* General error message */}
					{error.general && (
						<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
							{error.general}
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
					>
						{isLoading ? (
							<span className="loading loading-infinity loading-md" />
						) : (
							"Login"
						)}
					</button>
					<div className="flex text-sm gap-2">
						<p>Don't have an account?</p>
						<Link href={"/register"} className="text-blue-400 hover:underline">
							Register here
						</Link>
					</div>
				</form>
			</main>
		</div>
	);
};

export default LoginPage;
