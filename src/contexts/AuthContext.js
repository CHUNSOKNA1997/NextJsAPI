"use client";
import axios from "@/lib/axios";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

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

	// Function to set user after successful login/register
	const setAuthUser = (userData, token) => {
		if (token) {
			Cookies.set("auth_token", token, {
				expires: 7,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
			});
		}
		setUser(userData);
	};

	const value = {
		user,
		loading,
		isAuthenticated: !!user,
		setAuthUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
