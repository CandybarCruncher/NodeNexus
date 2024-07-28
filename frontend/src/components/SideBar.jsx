import React from "react";

const SideBar = () => {
	return (
		<>
			<div className="flex relative h-fit w-[25%] bg-[#12171d] p-3 m-2 rounded-2xl h-full">
				<div className="w-2/4 text-center text-xl font-bold">Nodes</div>
				<div className="w-2/4 text-center text-xl font-bold">Clusters</div>
			</div>
		</>
	);
};

export default SideBar;
