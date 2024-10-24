import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./src/pages/LandingPage";
import Landing from "./src/components/auth/Landing";
import Signup from "./src/components/auth/Signup";
import Login from "./src/components/auth/Login";
import HomePage from "./src/pages/HomePage";
import Post from "./src/components/profile/Post";
import UserProfile from "./src/components/profile/UserProfile";
import Chats from "./src/components/conversation/Chats";

export const router = createBrowserRouter([
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
				path: `/chat/:nodeId`,
				element: <Chats />,
			},
		],
	},
]);
