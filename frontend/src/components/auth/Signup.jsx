import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SubmitBtn from "../buttons/SubmitBtn";
import config from "../../../config";
import { setUserData } from "../../../local";
import InputField from "../InputField";
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from "@mui/material";

const Signup = () => {
	const { sharedValue } = useOutletContext();
	const [email, setEmail] = useState(sharedValue);
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [gender, setGender] = useState("");
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		const newUser = { email, name, username, password, gender };
		const userData = await config.post("/api/usr/signup", newUser);
		setUserData(userData);

		setName("");
		setUsername("");
		setEmail("");
		setPassword("");
		setGender("");
		navigate("/home");
	};

	return (
		<>
			<form onSubmit={submitHandler}>
				<div className="grid justify-items-center">
					<img
						src="logo.png"
						className="h-30 w-25"
					></img>
				</div>
				<div className="m-8">
					<div className="mb-4">
						<InputField
							name="email"
							type="text"
							value={email}
							className="form-control rounded-xl "
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
							className="form-control rounded-xl"
							placeholder="Password"
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							required
						/>
					</div>
					{/* <label>Gender</label> */}
					<FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
					<RadioGroup
						aria-labelledby="demo-radio-buttons-group-label"
						row
						name="radio-buttons-group"
						onChange={(event) => {
							setGender(event.target.value);
						}}
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

					<div className="mb-4">
						<SubmitBtn Placeholder="Commit" />
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
