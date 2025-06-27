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

// Add request interceptor to dynamically add token
axiosInstance.interceptors.request.use(
	(config) => {
		// Only access localStorage on client side
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

// Add response interceptor for token expiration handling
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// Token expired or invalid
			if (typeof window !== "undefined") {
				localStorage.removeItem("token");
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
