import axios from "axios";
import { getUserData } from "./local";

const config = axios.create({
	baseURL: "http://localhost:6969",
	headers: {
		"Content-Type": "application/json",
	},
});

config.interceptors.request.use((config) => {
	const token = getUserData()?.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default config;
