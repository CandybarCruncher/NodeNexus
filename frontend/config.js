import axios from "axios";
import { getUserData } from "./local";
export const ENDPOINT = "https://nodenexus-d11u.onrender.com/";

const config = axios.create({
	baseURL: ENDPOINT,
	headers: {
		"Content-Type": "application/json",
	},
});

config.interceptors.request.use((config) => {
	const token = getUserData()?.token;
	config.baseURL && (config.headers.Authorization = `Bearer ${token}`);
	return config;
});

export default config;
