import axios from "axios";

const APP_URL = process.env.NEXT_PUBLIC_API;

const axiosInstance = axios.create({
	baseURL: APP_URL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
	withCredentials: true,
});

export default axiosInstance;
