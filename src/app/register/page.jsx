"use client";

import { useRouter } from "next/navigation";
import axios from "../../lib/axios";
import React from "react";
import { useState } from "react";

const page = () => {
	const router = useRouter();
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const submitCallback = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError({});

		try {
			await axios.post("/register", formData);
			setFormData({
				name: "",
				email: "",
				password: "",
				password_confirmation: "",
			});
			router.push("/");
		} catch (err) {
			setError(err?.response?.data?.errors || {});
			setFormData({
				...formData,
				password: "",
				password_confirmation: "",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<main className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Register Account
				</h1>

				<form onSubmit={submitCallback} className="space-y-4">
					<div className="flex flex-col gap-1">
						<label htmlFor="name" className="text-sm font-medium">
							Name
						</label>
						<input
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							type="text"
							name="name"
							id="name"
							disabled={isLoading} // Disable input while loading
							className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
						/>
						{error.name && (
							<small className="text-sm text-red-500">{error.name}</small>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="email" className="text-sm font-medium">
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
							disabled={isLoading} // Disable input while loading
							className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
								error.email ? "border-red-500" : ""
							}`}
						/>
						{error.email && (
							<small className="text-sm text-red-500">{error.email}</small>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="password" className="text-sm font-medium">
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
							disabled={isLoading} // Disable input while loading
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
									{error.password?.map((err, index) => (
										<li key={index}>{err}</li>
									))}
								</ul>
							</small>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<label
							htmlFor="password_confirmation"
							className="text-sm font-medium"
						>
							Confirm Password
						</label>
						<input
							value={formData.password_confirmation}
							onChange={(e) =>
								setFormData({
									...formData,
									password_confirmation: e.target.value,
								})
							}
							type="password"
							name="password_confirmation"
							id="password_confirmation"
							disabled={isLoading} // Disable input while loading
							className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 ${
								error.password_confirmation ? "border-red-500" : ""
							}`}
						/>
						{error.password_confirmation && (
							<small className="text-sm text-red-500">
								{error.password_confirmation}
							</small>
						)}
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
					>
						{isLoading ? (
							<span className="loading loading-infinity loading-xl" />
						) : (
							"Register"
						)}
					</button>
				</form>
			</main>
		</>
	);
};

export default page;
