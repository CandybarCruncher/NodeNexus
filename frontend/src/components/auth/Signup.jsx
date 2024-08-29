import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SubmitBtn from "../buttons/SubmitBtn";
import config from "../../../config";
import { setUserData } from "../../../local";
import InputField from "../InputField";
import {
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Box,
	CircularProgress,
	Stack,
} from "@mui/material";
import ErrorHandler from "../ErrorHandler";
import { validate } from "../../../validatePattern";

const Signup = () => {
	const { sharedValue } = useOutletContext();
	const [formData, setFormData] = useState({
		name: "",
		email: sharedValue,
		password: "",
		username: "",
		gender: "male",
	});
	const [errors, setErrors] = useState({});
	const [pic, setPic] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const uploadImage = async (pic) => {
		try {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", pic);
			formData.append("upload_preset", "NodeNexus");
			const response = await config.post(
				"https://api.cloudinary.com/v1_1/dwkgrubve/image/upload",
				formData,
				{
					baseURL: "",
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			setLoading(false); // Hide loading indicator after upload
			return response.data.secure_url;
		} catch (error) {
			ErrorHandler(error);
		}
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const requiredFields = ["email", "name", "username", "password"];
		const validationErrors = validate(formData, requiredFields);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		try {
			if (pic) {
				formData.pic = pic;
			}

			const userData = await config.post("/api/usr/signup", formData);
			setUserData(userData);

			setFormData({
				name: "",
				email: "",
				password: "",
				username: "",
				gender: "",
			});
			setPic(null);

			navigate("/user");
		} catch (error) {
			ErrorHandler(error);
		}
	};

	return (
		<>
			<div className="grid justify-items-center">
				<a
					href="/"
					className="h-30 w-25 mt-[-13%]"
				>
					<img src="/logo.png" />
				</a>
			</div>
			<form onSubmit={submitHandler}>
				<div className="m-8">
					<InputField
						name="email"
						type="email"
						value={formData.email}
						placeholder="email@domain.com"
						onChange={handleChange}
						error={Boolean(errors.email)}
						helperText={errors.email}
						required
					/>
					<InputField
						name="name"
						type="text"
						value={formData.name}
						placeholder="Full name"
						onChange={handleChange}
						error={Boolean(errors.name)}
						helperText={errors.name}
						required
					/>

					<InputField
						name="username"
						type="text"
						value={formData.username}
						placeholder="Username"
						onChange={handleChange}
						error={Boolean(errors.username)}
						helperText={errors.username}
						required
					/>

					<InputField
						name="password"
						type="password"
						value={formData.password}
						placeholder="Password"
						onChange={handleChange}
						error={Boolean(errors.password)}
						helperText={errors.password}
						required
					/>
					<Stack
						direction="row"
						alignItems="center"
					>
						<Box sx={{ flexGrow: 1 }}>
							<label
								htmlFor="file-upload"
								className="custom-file-upload"
								style={{ marginRight: "10px" }}
							>
								Upload Profile Picture
							</label>
							<InputField
								name="pic"
								type="file"
								onChange={async (event) => {
									const selectedFile = event.target.files[0];
									setPic(selectedFile);
									setPic(await uploadImage(selectedFile));
								}}
							/>
						</Box>
						{loading && (
							<Box sx={{ marginLeft: "15px" }}>
								<CircularProgress />
							</Box>
						)}
					</Stack>

					<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						row
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						required
					>
						<FormControlLabel
							value="male"
							control={<Radio />}
							label="Male"
						/>
						<FormControlLabel
							value="female"
							control={<Radio />}
							label="Female"
						/>
						<FormControlLabel
							value="other"
							control={<Radio />}
							label="Other"
						/>
					</RadioGroup>

					<div className="my-3">
						<SubmitBtn
							Placeholder="Commit"
							disabled={loading}
						/>
					</div>
					<div className="grid justify-items-center mb-3 text-center">
						<p>
							By clicking proceed, you agree to our
							<a href="">Terms of service</a> and <a href="">Privacy Policy</a>
						</p>
					</div>
				</div>
			</form>
		</>
	);
};

export default Signup;
