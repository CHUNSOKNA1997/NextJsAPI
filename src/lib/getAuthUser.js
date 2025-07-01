import { cookies } from "next/headers";

const getAuthUser = async () => {
	const token = cookies().get("auth_token")?.value;

	if (token) {
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
				method: "GET",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const data = res.json();
			return data;
		} catch (error) {
			return null;
		}
	} else {
		return null;
	}
};

export default getAuthUser;
