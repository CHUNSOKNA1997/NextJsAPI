"use client";

import { useRouter } from "next/navigation";
import axios from "../../lib/axios";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const page = () => {
	const router = useRouter();
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const submitCallback = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError({});

		try {
			await axios.post("/login", formData);
			setFormData({
				email: "",
				password: "",
			});
			router.push("/");
		} catch (err) {
			console.log(err);
			setError(err?.response?.data?.errors || {});
			setFormData({
				...formData,
				password: "",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<main className="max-w-md mx-auto mt-8 p-6 rounded-lg shadow-md">
				<h1 className="text-2xl font-bold mb-6 text-center">Welcome back!!</h1>

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
							<small className="text-sm text-red-500">{error.email}</small>
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
									{error.password?.map((err, index) => (
										<li key={index}>{err}</li>
									))}
								</ul>
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
		</>
	);
};

export default page;
