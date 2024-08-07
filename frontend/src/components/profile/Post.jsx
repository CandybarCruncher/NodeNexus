import React from "react";
import LikeBtn from "../buttons/LikeBtn";
import CommentBtn from "../buttons/CommentBtn";
import ShareBtn from "../buttons/ShareBtn";
import { faker } from "@faker-js/faker";
import ContactCard from "../ContactCard";

const Post = () => {
	return (
		<>
			<div className="ml-3 my-2 bg-[#12171d] rounded-2xl w-[34rem]">
				<div className="flex justify-between items-center">
					<ContactCard />
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

export default Post;
