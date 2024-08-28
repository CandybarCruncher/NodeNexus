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
				<div className="max-w-[40rem] backdrop-blur-sm bg-white/5 rounded-3xl ">
					<Outlet context={{ sharedValue, setSharedValue }} />
				</div>
			</div>
		</>
	);
};

export default LandingPage;
