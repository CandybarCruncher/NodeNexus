import { Box, TextField } from "@mui/material";
import React from "react";

const InputField = ({
	name,
	type,
	value,
	placeholder,
	onChange,
	required,
	inputProps,
	helperText,
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
					inputProps={inputProps}
					helperText={helperText}
				/>
			</div>
		</Box>
	);
};

export default InputField;
