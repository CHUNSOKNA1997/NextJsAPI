import axios from "axios";
import Cookies from "js-cookie";

// lib/axios.js

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

// Add token to requests if it is exist
axiosInstance.interceptors.request.use(
	(config) => {
		const token = Cookies.get("auth_token");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Handle toke expiration
axiosInstance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			Cookies.remove("auth_token");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
