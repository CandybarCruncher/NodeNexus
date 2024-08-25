import { useEffect, useState } from "react";
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

const Signup = () => {
	const { sharedValue } = useOutletContext();
	const [email, setEmail] = useState(sharedValue);
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const [pic, setPic] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	useEffect(() => {
		console.log("success__" + pic);
	}, [pic]);

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
		try {
			e.preventDefault();

			const newUser = {
				email,
				name,
				username,
				password,
				gender,
			};
			if (pic) {
				newUser.pic = pic;
			}

			const userData = await config.post("/api/usr/signup", newUser);
			setUserData(userData);

			setName("");
			setUsername("");
			setEmail("");
			setPassword("");
			setGender("");
			setPic(null);

			navigate("/home");
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
					<div className="mb-4">
						<InputField
							name="email"
							type="text"
							value={email}
							className="form-control rounded-xl"
							placeholder="email@domain.com"
							onChange={(event) => {
								setEmail(event.target.value);
							}}
							required
						/>
					</div>
					<div className="mb-4">
						<InputField
							name="name"
							type="text"
							value={name}
							className="form-control rounded-xl"
							placeholder="Full name"
							inputProps={{ pattern: "^[a-zA-Z]+(?: [a-zA-Z]+)*$" }}
							helperText={"Please enter your full name"}
							onChange={(event) => {
								setName(event.target.value);
							}}
							required
						/>
					</div>
					<div className="mb-4">
						<InputField
							name="username"
							type="text"
							value={username}
							className="form-control rounded-xl"
							placeholder="Username"
							inputProps={{ pattern: "^[A-Za-z0-9_]{5,15}$" }}
							onChange={(event) => {
								setUsername(event.target.value);
							}}
							required
						/>
					</div>
					<div className="mb-4">
						<InputField
							name="password"
							type="password"
							value={password}
							className="form-control rounded-xl"
							placeholder="Password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							required
						/>
					</div>
					<Stack
						direction="row"
						alignItems="center"
					>
						<Box
							className="mb-4"
							sx={{ flexGrow: 1 }}
						>
							<label
								htmlFor="file-upload"
								className="custom-file-upload"
								style={{ marginRight: "10px" }}
							>
								Upload picture
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
						name="radio-buttons-group"
						onChange={(event) => {
							setGender(event.target.value);
						}}
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
