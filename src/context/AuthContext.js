"use client";
import axios from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuthStatus = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setIsLoading(false);
				return;
			}

			try {
				const response = await axios.get("/user");
				setUser(response.data);
			} catch (error) {
				localStorage.removeItem("token");
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuthStatus();
	}, []);

	const login = (userData, token) => {
		localStorage.setItem("token", token);
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, isLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
