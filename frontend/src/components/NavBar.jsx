import React, { useState } from "react";
import SideBar from "./SideBar";
import "../CSS/homePage.css";

const NavBar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSideBarOpen, setIsSideBarOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
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
			<nav className="bg-[#0b0c10] shadow-md sticky top-0 z-50">
				<div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16 items-center">
						<div className="flex items-center">
							<button
								onClick={toggleMenu}
								className="lg:hidden p-2 rounded-md text-[#45a29e] hover:text-black hover:bg-[#45a29e] focus:outline-none focus:bg-[#45a29e] focus:text-black"
							>
								<svg
									className="h-6 w-6"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 24 24"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
								>
									{isMenuOpen ? (
										<path d="M6 18L18 6M6 6l12 12" />
									) : (
										<path d="M4 6h16M4 12h16m-16 6h16" />
									)}
								</svg>
							</button>
							<a
								href="/home"
								className="ml-2"
							>
								<img
									src="logo.png"
									alt="Logo"
									className="h-12 w-12"
								/>
							</a>
						</div>
						<div className="hidden sm:inline items-center w-[27rem] mx-4">
							<form className="flex w-full">
								<input
									className="form-control rounded-full bg-[#1f2833]"
									type="search"
									placeholder="&#128269; Search"
									aria-label="Search"
								/>
							</form>
						</div>
						<div className="flex items-center">
							<div className="hidden md:flex space-x-4">
								<a href="/notifications">
									<img
										src="https://img.icons8.com/?size=100&id=11642&format=png&color=45A29E"
										alt="Notification Icon"
										className="h-9 w-9"
									/>
								</a>

								<a href="/user">
									<img
										src="https://img.icons8.com/?size=100&id=7819&format=png&color=45A29E"
										alt="User Icon"
										className="h-10 w-10"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>

				{isMenuOpen && (
					<div className="lg:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
							<form className="flex sm:hidden px-3 py-2">
								<input
									className="form-control rounded-full bg-[#1f2833]"
									type="search"
									placeholder="&#128269; Search"
									aria-label="Search"
								/>
							</form>
							<a
								href="/home"
								className="lg:hidden block px-3 py-2 rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
							>
								Home
							</a>
							<a
								href="/search"
								className="block px-3 py-2 rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
							>
								Search
							</a>
							<a
								href="/notifications"
								className="md:hidden block px-3 py-2 rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
							>
								Notifications
							</a>
							<a
								href="/user"
								className="md:hidden block px-3 py-2 rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
							>
								User
							</a>
							<a
								onClick={openSideBar}
								className="block px-3 py-2 rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
							>
								Chats
							</a>
						</div>
					</div>
				)}
			</nav>

			{isSideBarOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50">
					<div className="fixed inset-0 bg-[#0b0c10] shadow-lg z-50 p-4">
						<button
							onClick={closeSideBar}
							className="p-2 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
						>
							<svg
								className="h-6 w-6"
								stroke="currentColor"
								fill="none"
								viewBox="0 0 24 24"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							>
								<path d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
						<SideBar />
					</div>
				</div>
			)}
		</>
	);
};

export default NavBar;
