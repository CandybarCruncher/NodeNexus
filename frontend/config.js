import axios from "axios";

const config = axios.create({
	baseURL: "http://localhost:6969", // Replace with your base URL
	headers: {
		"Content-Type": "application/json",
	},
});

// export default api;

// const config = {
// 	headers: {
// 		"Content-type": "application/json",
// 	},
// 	baseURL: "http://localhost:6969",
// };

export default config;
