import React from "react";

const ShareBtn = () => {
	return (
		<div>
			<div className="flex p-2">
				<div className="mr-1">
					<i
						className="fa-solid fa-paper-plane"
						style={{ color: "#ffffff" }}
					></i>
				</div>
				<div className="mr-2">Share</div>
			</div>
		</div>
	);
};

export default ShareBtn;
