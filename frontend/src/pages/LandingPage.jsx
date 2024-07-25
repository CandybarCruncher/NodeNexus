import React from "react";
import { Outlet } from "react-router-dom";
import "../CSS/landingPage.css";
import BackgroundVideo from "../components/BackgroundVideo";

const LandingPage = () => {
	return (
		<>
			<div className="test">
				<BackgroundVideo />
				<div>
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default LandingPage;
