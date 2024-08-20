import axios from "axios";
import { getUserData } from "./local";
export const ENDPOINT =
	"http://localhost:6969";

const config = axios.create({
	baseURL: ENDPOINT,
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
