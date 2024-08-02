import React from "react";

const UserBanner = () => {
	return (
		<>
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
		</>
	);
};

export default UserBanner;
