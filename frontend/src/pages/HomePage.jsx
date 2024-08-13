import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const HomePage = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};
	const openSideBar = () => {
		setIsSideBarOpen(true);
		setIsMenuOpen(false);
	};

	const closeSideBar = () => {
		setIsSideBarOpen(false);
	};
	return (
		<>
			<NavBar
				toggleMenu={toggleMenu}
				openSideBar={openSideBar}
				closeSideBar={closeSideBar}
				isSideBarOpen={isSideBarOpen}
				isMenuOpen={isMenuOpen}
			/>
			<div className="flex">
				<div className="hidden h-full lg:inline-block">
					<SideBar />
				</div>
				<div className="w-full over backdrop-blur-sm bg-white/5 m-2 rounded-2xl overflow-hidden">
					<Outlet context={{ closeMenu }} />
				</div>
			</div>
		</>
	);
};

export default HomePage;
