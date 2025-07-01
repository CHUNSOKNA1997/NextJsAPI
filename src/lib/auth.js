import axios from "@/lib/axios";
import Cookies from "js-cookie";

export const isValidToken = async () => {
	const token = Cookies.get("auth_token");

	if (!token) {
		return false;
	}
	try {
		const res = await axios.get("/user", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return !!res.data;
	} catch (error) {
		return false;
	}
};
