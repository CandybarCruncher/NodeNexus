import React from "react";

const CommentBtn = () => {
	return (
		<div>
			<div className="flex p-2">
				<div className="mr-1">
					<i
						class="fa-regular fa-comment"
						style={{ color: "#ffffff" }}
					></i>
				</div>
				<div className="mr-2">Comments</div>
			</div>
		</div>
	);
};

export default CommentBtn;
