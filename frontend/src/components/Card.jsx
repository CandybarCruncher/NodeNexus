import React from "react";
import LikeBtn from "./LikeBtn";
import CommentBtn from "./CommentBtn";
import ShareBtn from "./ShareBtn";
import UserBanner from "./UserBanner";
import { faker } from "@faker-js/faker";

const Card = () => {
	return (
		<>
			<div className="ml-3 my-2 bg-[#12171d] rounded-2xl w-[34rem]">
				<div className="flex justify-between items-center">
					<UserBanner />
					<i className="fa-solid fa-ellipsis-vertical mr-5"></i>
				</div>

				<div className="">
					<img
						src={faker.image.image()}
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
