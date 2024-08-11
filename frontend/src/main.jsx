import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signup from "./components/auth/Signup.jsx";
import Landing from "./components/auth//Landing.jsx";
import Login from "./components/auth/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import Post from "./components/profile/Post.jsx";
import UserProfile from "./components/profile/UserProfile.jsx";
import Chats from "./components/conversation/Chats.jsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#40c9c9",
			dark: "#45a29e",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#b30404",
			dark: "#ff0000",
			light: "#ff0000",
		},
		text: {
			primary: "#c1c1c1",
			secondary: "#9a9a9a",
			disabled: "#7d7d7d",
		},
		background: {
			default: "#0b0c10",
			paper: "#1f2833",
		},
		divider: "rgba(183,183,183,0.2)",
	},
});

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
		children: [
			{
				path: "/",
				element: <Landing />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
	{
		path: "/",
		element: <HomePage />,
		children: [
			{
				path: "/home",
				element: <Post />,
			},
			{
				path: "/user",
				element: <UserProfile />,
			},
			{
				path: `/chat/:chatId`,
				element: <Chats />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>
);
