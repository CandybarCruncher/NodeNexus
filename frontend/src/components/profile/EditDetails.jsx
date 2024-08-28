import React, { useState } from "react";
import { Box, Modal, Typography, Stack, IconButton } from "@mui/material";
import config from "../../../config";
import ErrorHandler from "../ErrorHandler";
import SubmitBtn from "../buttons/SubmitBtn";
import InputField from "../InputField";
import { setUserData } from "../../../local";
import { validate } from "../../../validatePattern";

const EditDetails = ({ open, handleClose, userData }) => {
	const [formData, setFormData] = useState({
		name: userData.name,
		email: userData.email,
		username: userData.username,
		token: userData.token,
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requiredFields = ["email", "name", "username"];
		const validationErrors = validate(formData, requiredFields);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		try {
			const updatedUser = await config.put(
				`/api/usr/edit/${userData._id}`,
				formData
			);
			setUserData(updatedUser);
			setErrors({});
			handleClose();
		} catch (error) {
			ErrorHandler(error);
		}
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
		>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: "500px",
					bgcolor: "#0b0c10",
					border: "2px solid #45a29e",
					borderRadius: "10px",
					boxShadow: 24,
					p: 4,
					zIndex: 10,
				}}
			>
				<IconButton
					onClick={handleClose}
					sx={{ position: "absolute", top: 8, right: 8 }}
				>
					<i className="fa-solid fa-times text-white"></i>
				</IconButton>
				<Typography
					variant="h6"
					component="h2"
					sx={{ mb: 2, textAlign: "center", color: "#45a29e" }}
				>
					EDIT YOUR DETAILS
				</Typography>
				<Stack>
					<InputField
						name="name"
						type="text"
						value={formData.name}
						placeholder="Full name"
						error={Boolean(errors.name)}
						helperText={errors.name}
						onChange={handleChange}
						required
					/>
					<InputField
						name="email"
						type="text"
						value={formData.email}
						placeholder="email@domain.com"
						onChange={handleChange}
						error={Boolean(errors.email)}
						helperText={errors.email}
						required
					/>
					<InputField
						name="username"
						type="text"
						value={formData.username}
						placeholder="Username"
						error={Boolean(errors.username)}
						helperText={errors.username}
						onChange={handleChange}
						required
					/>
					<SubmitBtn
						Placeholder={"Save"}
						onClick={handleSubmit}
					/>
				</Stack>
			</Box>
		</Modal>
	);
};

export default EditDetails;
