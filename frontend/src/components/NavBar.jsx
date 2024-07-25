import React from "react";
import "../CSS/homePage.css";

const NavBar = () => {
	return (
		<>
			<div className="sticky-nav">
				<div className="nav-option">
					<div className="p-2">
						<a href="/home">
							<img
								src="logo.png"
								className="h-12 w-12"
							></img>
						</a>
					</div>
					<div className="p-2">
						<form class="flex">
							<input
								class="form-control rounded-l-full"
								type="search"
								placeholder="Search"
								aria-label="Search"
							></input>
							<button
								class="btn bg-[#fff] rounded-r-full"
								type="submit"
							>
								<i
									class="fa-solid fa-magnifying-glass"
									style={{ color: "#66fcf1" }}
								></i>
							</button>
						</form>
					</div>
				</div>
				<div className="nav-option">
					<div className="p-2">
						<img
							src="https://img.icons8.com/?size=100&id=11642&format=png&color=45A29E"
							className="h-9 w-9"
						></img>
					</div>
					<div className="p-2">
						<a href="/user">
							<img
								src="https://img.icons8.com/?size=100&id=7819&format=png&color=45A29E"
								className="h-10 w-10"
							></img>
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default NavBar;
