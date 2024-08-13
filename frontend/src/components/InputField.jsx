import { Box, TextField } from "@mui/material";
import React from "react";

const InputField = ({
	name,
	type,
	value,
	className,
	placeholder,
	onChange,
	required,
}) => {
	return (
		<Box
			sx={{
				"& .MuiTextField-root": {},
			}}
			noValidate
			autoComplete="off"
		>
			<div>
				<TextField
					id="outlined-multiline-flexible"
					label={placeholder}
					fullWidth
					name={name}
					type={type}
					value={value}
					onChange={onChange}
					required={required}
				/>
			</div>
		</Box>
	);
};

export default InputField;
