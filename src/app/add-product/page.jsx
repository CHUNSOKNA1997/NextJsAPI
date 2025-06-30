"use client";

import { useState } from "react";
import axios from "@/lib/axios";
import { useRouter } from "next/navigation";

const page = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		price: "",
		quantity: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post("/v1/products", formData);
			setFormData({
				name: "",
				description: "",
				price: "",
				quantity: "",
			});
			router.push("/dashboard");
		} catch (err) {
			console.error("Error creating product:", err);
			setFormData({
				name: "",
				description: "",
				price: "",
				quantity: "",
			});
		}
	};

	return (
		<div className="flex items-center justify-center">
			<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
					Create Product
				</h1>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
							Name
						</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full border border-gray-400 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div>
						<label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
							Description
						</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleChange}
							className="w-full border border-gray-400 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div>
						<label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
							Price ($)
						</label>
						<input
							type="number"
							name="price"
							value={formData.price}
							onChange={handleChange}
							className="w-full border border-gray-400 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div>
						<label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
							Quantity
						</label>
						<input
							type="number"
							name="quantity"
							value={formData.quantity}
							onChange={handleChange}
							className="w-full border border-gray-400 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold py-2 rounded-lg transition"
					>
						Create
					</button>
				</form>
			</div>
		</div>
	);
};

export default page;
