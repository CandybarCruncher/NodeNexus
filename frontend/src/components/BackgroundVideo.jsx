import React from "react";
import "../CSS/backgroundVideo.css";

const BackgroundVideo = () => {
	return (
		<div className="video-container">
			<video
				autoPlay
				loop
				muted
			>
				<source
					src="bg-video2.mp4"
					type="video/mp4"
				/>
				Your browser does not support the video tag.
			</video>
		</div>
	);
};

export default BackgroundVideo;
