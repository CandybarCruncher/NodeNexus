import React from "react";
import { useState } from "react";

const LikeBtn = () => {
	let [isLiked, setIsLiked] = useState(false);
	let toggleLike = () => {
		setIsLiked(!isLiked);
	};

	return (
		<>
			<div className="flex p-2">
				<div
					className="mr-1"
					onClick={toggleLike}
				>
					{isLiked ? (
						<i
							className="fa-solid fa-heart"
							style={{ color: "#45a29e" }}
						></i>
					) : (
						<i
							className="fa-regular fa-heart"
							style={{ color: "#ffffff" }}
						></i>
					)}
				</div>
				<div className="mr-3">likes</div>
			</div>
		</>
	);
};

export default LikeBtn;
