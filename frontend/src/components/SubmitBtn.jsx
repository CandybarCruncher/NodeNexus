import React from "react";

const SubmitBtn = ({ Placeholder, disabled }) => {
	// console.log("SubmitBtn Rendered - Disabled:", disabled);

	return (
		<button
			className="btn bg-[#45a29e] rounded-full size-full"
			disabled={disabled}
			// type="submit"
		>
			{Placeholder}
		</button>
	);
};

export default SubmitBtn;
