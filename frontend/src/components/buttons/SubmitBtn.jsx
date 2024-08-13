import { Button } from "@mui/material";

const SubmitBtn = ({ Placeholder }) => {
	return (
		<Button
			type="submit"
			variant="contained"
			sx={{
				width: "100%",
				borderRadius: 4,
				color: "black",
				fontWeight: "bolder",
			}}
		>
			{Placeholder}
		</Button>
	);
};

export default SubmitBtn;
