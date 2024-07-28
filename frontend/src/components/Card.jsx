import React from "react";
import LikeBtn from "./LikeBtn";
import CommentBtn from "./CommentBtn";
import ShareBtn from "./ShareBtn";

const Card = () => {
	return (
		<>
			<div className="my-2 bg-[#12171d] rounded-2xl w-[34rem]">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<div className="m-2 rounded-full">
							<img
								src="https://images.unsplash.com/photo-1611697522020-f44d4e818698?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								className="size-[3rem] rounded-full"
							></img>
						</div>
						<div>
							<strong className="ml-1 text-xl">@username</strong>
						</div>
					</div>
					<i class="fa-solid fa-ellipsis-vertical mr-5"></i>
				</div>
				<div className="">
					<img
						src="https://plus.unsplash.com/premium_photo-1666432045848-3fdbb2c74531?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						className="w-[34rem] h-[34rem] object-cover"
					></img>
				</div>
				<div className="flex flex-end m-2">
					<LikeBtn />
					<CommentBtn />
					<ShareBtn />
				</div>
			</div>
		</>
	);
};

export default Card;
