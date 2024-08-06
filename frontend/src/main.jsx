import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Signup from "./components/Signup.jsx";
import Landing from "./components/Landing.jsx";
import Login from "./components/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import Card from "./components/Card.jsx";
import UserProfile from "./components/UserProfile.jsx";
import Chats from "./components/conversation/Chats.jsx";

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
				element: <Card />,
			},
			{
				path: "/user",
				element: <UserProfile />,
			},
			{
				path: "/chat",
				element: <Chats />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
