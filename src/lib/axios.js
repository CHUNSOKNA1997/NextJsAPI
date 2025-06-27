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

axiosInstance.interceptors.request.use(
	(config) => {
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			if (typeof window !== "undefined") {
				localStorage.removeItem("token");
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
