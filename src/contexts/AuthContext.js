"use client";

import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	/**
	 * Check authentication on page load
	 */
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const token = Cookies.get("auth_token");
				if (token) {
					const response = await axios.get("/user");
					setUser(response.data.user || response.data);
				}
			} catch (error) {
				console.error("Auth check failed:", error);
				Cookies.remove("auth_token");
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	/**
	 * Function to set user after successful login/register
	 * @param {*} userData
	 * @param {*} token
	 */
	const setAuthUser = (userData, token) => {
		if (token) {
			Cookies.set("auth_token", token, {
				expires: 7,
				sameSite: "strict",
			});
		}
		setUser(userData);
	};

	// Login function
	const login = (userData, token) => {
		setUser(userData);
		Cookies.set("auth_token", token);
	};

	// Logout function - this is what was missing
	const logout = () => {
		setUser(null);
		Cookies.remove("auth_token");
	};

	const value = {
		user,
		login,
		logout,
		loading,
		setAuthUser,
	};

	/**
	 * Set value of AuthContext with a value of user, loading, and setAuthUser
	 */
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
