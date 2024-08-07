import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import SubmitBtn from "../buttons/SubmitBtn";
import config from "../../../config";

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
		await config.post("/api/usr/signup", newUser);
		setName("");
		setUsername("");
		setEmail("");
		setPassword("");
		setGender("");
		navigate("/home");
	};

	return (
		<>
			<div className="border-solid border-2 rounded-3xl">
				<form onSubmit={submitHandler}>
					<div className="grid justify-items-center">
						<img
							src="logo.png"
							className="h-30 w-25"
						></img>
					</div>
					<div className="m-8">
						<div className="mb-4">
							<input
								name="email"
								type="text"
								value={email}
								className="form-control rounded-xl "
								placeholder="email@domain.com"
								onChange={(event) => {
									setEmail(event.target.value);
								}}
								required
							></input>
						</div>
						<div className="flex mb-4">
							<input
								name="name"
								type="text"
								value={name}
								className="form-control rounded-xl"
								placeholder="Full name"
								onChange={(event) => {
									setName(event.target.value);
								}}
								required
							></input>
						</div>
						<div className="mb-4">
							<input
								name="username"
								type="text"
								value={username}
								className="form-control rounded-xl"
								placeholder="Username"
								onChange={(event) => {
									setUsername(event.target.value);
								}}
								required
							></input>
						</div>
						<div className="mb-4">
							<input
								name="password"
								type="password"
								className="form-control rounded-xl"
								placeholder="Password"
								onChange={(event) => {
									setPassword(event.target.value);
								}}
								required
							></input>
						</div>
						<label>Gender</label>
						<div
							className="flex mb-4"
							onChange={(event) => {
								setGender(event.target.value);
							}}
						>
							<div className="form-check mr-3">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="male"
									value="male"
								></input>
								<label
									className="form-check-label"
									htmlFor="male"
								>
									Male
								</label>
							</div>
							<div className="form-check mr-3">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="female"
									value="female"
								></input>
								<label
									className="form-check-label"
									htmlFor="female"
								>
									Female
								</label>
							</div>
							<div className="form-check mr-3">
								<input
									className="form-check-input"
									type="radio"
									name="inlineRadioOptions"
									id="other"
									value="other"
								></input>
								<label
									className="form-check-label"
									htmlFor="other"
								>
									Other
								</label>
							</div>
						</div>
						<div className="mb-4">
							<SubmitBtn Placeholder="Commit" />
						</div>
						<div className="grid justify-items-center mb-3 text-center">
							<p>
								By clicking proceed, you agree to our{" "}
								<a href="">Terms of service</a> and{" "}
								<a href="">Privacy Policy</a>
							</p>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default Signup;
