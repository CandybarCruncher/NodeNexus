import React from "react";
import Card from "./Card";

const UserProfile = () => {
	return (
		<>
			<div className="ml-2 border rounded-xl mt-2">
				<div className="rounded-t-xl overflow-hidden">
					<img
						src="https://images.unsplash.com/photo-1709884735646-897b57461d61?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						className="h-[12rem] w-[65rem] object-cover"
					></img>
				</div>
				<div className="mt-4 ml-6 rounded-full flex">
					<div>
						<img
							src="https://images.unsplash.com/photo-1709884735626-63e92727d8b6?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							className="size-52 rounded-full"
						></img>
						<p className="m-4 text-3xl font-semibold">@username</p>
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
				<Card />
			</div>
		</>
	);
};

export default UserProfile;
