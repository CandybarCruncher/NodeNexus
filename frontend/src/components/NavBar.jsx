import React from "react";
import SideBar from "./SideBar";
import { clearUserData } from "../../local";
import SearchBox from "./SearchBox";
import AddUserBtn from "./buttons/AddUserBtn";
import { Modal } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";

const NavBar = ({
	toggleMenu,
	openSideBar,
	closeSideBar,
	isSideBarOpen,
	isMenuOpen,
	openSearchBox,
	isSearchOpen,
	closeSearchBox,
}) => {
	const handleLogout = () => {
		clearUserData();
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
									src="/logo.png"
									alt="Logo"
									className="h-12 w-12"
								/>
							</a>
						</div>
						<div className="hidden md:inline items-center mx-4">
							<form className="flex w-full">
								<SearchBox btnType={AddUserBtn} />
							</form>
						</div>
						<div className="flex items-center">
							<div className="hidden sm:flex space-x-4">
								<a href="/notifications">
									<NotificationsActiveIcon
										sx={{
											fontSize: "2.5rem",
											color: "#45a29e",
										}}
									/>
								</a>

								<a href="/user">
									<AccountCircleIcon
										sx={{
											fontSize: "2.5rem",
											color: "#45a29e",
										}}
									/>
								</a>
								<a
									href="/"
									onClick={handleLogout}
								>
									<LogoutIcon
										sx={{
											fontSize: "2.5rem",
											color: "#45a29e",
										}}
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
				{isMenuOpen && (
					<Modal
						open={isMenuOpen}
						onClose={toggleMenu}
						aria-labelledby="modal-title"
						aria-describedby="modal-description"
						sx={{
							zIndex: 49,
						}}
					>
						<div className="mt-[4rem]">
							<div
								className="lg:hidden absolute bg-black w-full rounded-xl"
								onClick={toggleMenu}
							>
								<div className="px-2 pb-2 space-y-1 sm:px-3 ">
									<a
										href="/home"
										className="lg:hidden block px-3 py-2 flex justify-center rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
									>
										<HomeIcon />
										Home
									</a>
									<a
										onClick={openSearchBox}
										className="cursor-pointer md:hidden block px-3 py-2 flex justify-center rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
									>
										<SearchIcon />
										Search
									</a>
									<a
										href="/notifications"
										className="sm:hidden block px-3 py-2 flex justify-center rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
									>
										<NotificationsIcon />
										Notifications
									</a>

									<a
										onClick={openSideBar}
										className="cursor-pointer block px-3 py-2 flex justify-center rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
									>
										<ChatIcon />
										Chats
									</a>
									<a
										href="/user"
										className="sm:hidden block px-3 py-2 flex justify-center rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
									>
										<PersonIcon />
										Your Profile
									</a>
									<a
										href="/"
										onClick={handleLogout}
										className="sm:hidden block px-3 py-2 flex justify-center rounded-md text-center font-medium text-[#45a29e] hover:text-white hover:bg-[#45a29e]"
									>
										<LogoutIcon />
										Log out
									</a>
								</div>
							</div>
						</div>
					</Modal>
				)}
			</nav>

			{isSearchOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50">
					<div className="fixed inset-0 bg-[#0b0c10] shadow-lg z-50 p-4">
						<button
							onClick={closeSearchBox}
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
						<div className="grid justify-center">
							<SearchBox />
						</div>
					</div>
				</div>
			)}

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
						<SideBar closeSideBar={closeSideBar} />
					</div>
				</div>
			)}
		</>
	);
};

export default NavBar;
