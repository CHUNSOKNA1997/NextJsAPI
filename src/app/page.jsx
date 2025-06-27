import React from "react";
import { ShoppingCart, User } from "lucide-react";

export default function Page() {
	const products = [
		{
			name: 'Apple MacBook Pro 17"',
			color: "Silver",
			category: "Laptop",
			price: "$2999",
		},
		{
			name: "Microsoft Surface Pro",
			color: "White",
			category: "Laptop PC",
			price: "$1999",
		},
		{
			name: "Magic Mouse 2",
			color: "Black",
			category: "Accessories",
			price: "$99",
		},
	];

	return (
		<div className="min-h-screen text-white mb-20">
			{/* Table Container */}
			<div className="p-6">
				<div className="bg-zinc-700 rounded-lg shadow-sm overflow-hidden">
					<table className="w-full">
						<thead className="bg-zinc-800 border-b border-zinc-600">
							<tr>
								<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
									Product Name
								</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
									Color
								</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
									Category
								</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
									Price
								</th>
								<th className="px-6 py-4 text-left text-sm font-medium text-zinc-300 uppercase tracking-wider">
									<span className="sr-only">Actions</span>
								</th>
							</tr>
						</thead>
						<tbody className="bg-zinc-700 divide-y divide-zinc-600">
							{products.map((product, index) => (
								<tr key={index} className="hover:bg-zinc-600 transition-colors">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-100">
										{product.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
										{product.color}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-300">
										{product.category}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-zinc-100">
										{product.price}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm">
										<button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
											Edit
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
