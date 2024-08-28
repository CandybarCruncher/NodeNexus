import { Box, TextField } from "@mui/material";
import React from "react";

const InputField = ({
	name,
	type,
	value,
	placeholder,
	onChange,
	required,
	error,
	helperText,
}) => {
	return (
		<Box
			sx={{
				"& .MuiTextField-root": {},
				mb: "1.5rem",
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
					error={error}
					helperText={helperText}
				/>
			</div>
		</Box>
	);
};

export default InputField;
