import React from "react";
import Post from "../profile/Post.jsx";
import { faker } from "@faker-js/faker";

const UserProfile = () => {
	return (
		<>
			<div className="ml-2 border rounded-xl mt-2">
				<div className="rounded-t-xl overflow-hidden">
					<img
						src={faker.image.image()}
						className="h-[12rem] w-[65rem] object-cover"
					></img>
				</div>
				<div className="mt-4 ml-6 rounded-full flex">
					<div>
						<img
							src={faker.image.avatar()}
							className="size-52 rounded-full"
						></img>
						<p className="m-4 text-3xl font-semibold">
							{faker.name.fullName()}
						</p>
					</div>
					<span className="m-8 text-xl  font-semibold">2 posts</span>
					<p className="m-8 text-xl font-semibold">2M nodes</p>
					<div className="w-full grid justify-items-end">
						<button className="btn bg-[#45a29e] rounded-full h-10 w-[9rem] mr-3">
							Connect
						</button>
						<textarea
							placeholder="Write your bio here..."
							className="bg-[#0B0C10] border-solid border-2 rounded-3xl p-3 m-2 w-full"
						></textarea>
					</div>
				</div>
				<div className="flex items-center">
					<span className="font-medium px-3">Activity</span>
					<hr className=" w-full"></hr>
				</div>
				<Post />
			</div>
		</>
	);
};

export default UserProfile;
