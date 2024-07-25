import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const HomePage = () => {
	return (
		<>
			<NavBar />
			<div className="flex">
				<SideBar />
				<Outlet />
			</div>
		</>
	);
};

export default HomePage;
