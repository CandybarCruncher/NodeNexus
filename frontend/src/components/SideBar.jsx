import React from "react";
import UserBanner from "./UserBanner";
import "../CSS/homePage.css";

const SideBar = () => {
	return (
		<div className="sticky top-[4.5rem] bg-[#0b0c10] backdrop-blur-sm bg-white/5 relative p-3 m-2 rounded-2xl lg:w-[25rem] ">
			<ul
				className="nav nav-pills mb-3 w-full flex justify-center md:justify-start"
				id="pills-tab"
				role="tablist"
			>
				<li
					className="nav-item flex-1 md:w-2/4"
					role="presentation"
				>
					<button
						className="nav-link active w-full"
						id="pills-home-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-home"
						type="button"
						role="tab"
						aria-controls="pills-home"
						aria-selected="true"
					>
						Nodes
					</button>
				</li>
				<li
					className="nav-item flex-1 md:w-2/4"
					role="presentation"
				>
					<button
						className="nav-link w-full"
						id="pills-profile-tab"
						data-bs-toggle="pill"
						data-bs-target="#pills-profile"
						type="button"
						role="tab"
						aria-controls="pills-profile"
						aria-selected="false"
					>
						Clusters
					</button>
				</li>
			</ul>
			<div
				className="tab-content"
				id="pills-tabContent"
			>
				<div
					className="tab-pane fade show active"
					id="pills-home"
					role="tabpanel"
					aria-labelledby="pills-home-tab"
				>
					<UserBanner />
					<UserBanner />
				</div>
				<div
					className="tab-pane fade"
					id="pills-profile"
					role="tabpanel"
					aria-labelledby="pills-profile-tab"
				>
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />

					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
					<UserBanner />
				</div>
			</div>
		</div>
	);
};

export default SideBar;
