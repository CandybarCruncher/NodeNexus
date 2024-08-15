import axios from "axios";
import { getUserData } from "./local";

const config = axios.create({
	baseURL: "http://localhost:6969",
	headers: {
		"Content-Type": "application/json",
	},
});

config.interceptors.request.use((config) => {
	config.baseURL
		? (config.headers.Authorization = `Bearer ${getUserData()?.token}`)
		: console.log("skipped");
	return config;
});

export default config;
