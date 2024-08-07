import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../CSS/landingPage.css";
import BackgroundVideo from "../components/BackgroundVideo";

const LandingPage = () => {
	const [sharedValue, setSharedValue] = useState("");
	return (
		<>
			<div className="test">
				<BackgroundVideo />
				<div>
					<Outlet context={{ sharedValue, setSharedValue }} />
				</div>
			</div>
		</>
	);
};

export default LandingPage;
