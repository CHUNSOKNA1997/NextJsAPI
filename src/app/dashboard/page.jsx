"use client";

import axios from "@/lib/axios";
import { useEffect } from "react";

const Page = () => {
	useEffect(() => {
		const fetchData = async () => {
			try {
				await axios.get("/v1/products");
			} catch (err) {
				console.log(err);
			}
		};

		fetchData();
	}, []);

	return <div>Dashboard</div>;
};

export default Page;
