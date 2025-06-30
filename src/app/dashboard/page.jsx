"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
import Link from "next/link";

export default function Page() {
	const { user, authLoading } = useAuth();
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get("/v1/products");
				const data = response.data?.products || [];
				setProducts(data);
				setError(null);
			} catch (err) {
				console.error("Error fetching products:", err);
				setError(err.response?.data?.message || "Failed to fetch products");
			} finally {
				setIsLoading(false);
			}
		};

		// Only fetch products if user is authenticated and not loading
		if (!authLoading && user) {
			fetchProducts();
		} else if (!authLoading && !user) {
			setIsLoading(false);
		}
	}, [user, authLoading]);

	// Show loading state while checking authentication
	if (authLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-white">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	// Show login prompt if not authenticated
	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center text-white">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
					<p>Please log in to view products.</p>
				</div>
			</div>
		);
	}

	// Show loading state while fetching products
	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center text-white">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
					<p>Loading products...</p>
				</div>
			</div>
		);
	}

	// Show error state
	if (error) {
		return (
			<div className="min-h-screen flex items-center justify-center text-white">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4 text-red-400">Error</h2>
					<p className="mb-4">{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
					>
						Try Again
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen text-white mb-20">
			{/* Table Container */}
			<div className="p-6">
				<div className="mb-6 flex justify-between">
					<div>
						<h1 className="text-3xl font-bold">Products</h1>
						<p className="text-zinc-400 mt-2">
							Welcome back, {user.name || user.email}! Here are your products.
						</p>
					</div>

					<Link
						href="/add-product"
						className="text-blue-500 hover:underline hover:cursor-pointer mt-2"
					>
						Add new product
					</Link>
				</div>

				{products.length === 0 ? (
					<div className="bg-zinc-700 rounded-lg p-8 text-center">
						<p className="text-zinc-300">No products found.</p>
					</div>
				) : (
					<div className="bg-zinc-700 rounded-lg shadow-sm overflow-hidden">
						<table className="w-full">
							<thead className="bg-zinc-800 border-b border-zinc-600">
								<tr>
									<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
										Product Name
									</th>
									<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
										Product Description
									</th>
									<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
										Product Price
									</th>
									<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
										Product Quantity
									</th>
									<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
										<span className="sr-only">Actions</span>
									</th>
								</tr>
							</thead>
							<tbody className="bg-zinc-700 divide-y divide-zinc-600">
								{products.map((product, index) => (
									<tr
										key={product.id || index}
										className="hover:bg-zinc-600 transition-colors"
									>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-100">
											{product.name}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
											{product.description}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
											${product.price}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-100">
											{product.quantity}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm">
											<Link
												href={`${product.uuid}/edit-product`}
												className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
											>
												Edit
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
