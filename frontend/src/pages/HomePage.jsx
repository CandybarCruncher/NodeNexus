import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const HomePage = () => {
	return (
		<>
			<NavBar />
			<div className="flex">
				<div className="hidden h-full lg:inline-block">
					<SideBar />
				</div>
				<div className="w-full over backdrop-blur-sm bg-white/5 m-2 rounded-2xl overflow-hidden">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default HomePage;
