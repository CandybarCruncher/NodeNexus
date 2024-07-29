import axios from "axios";
import React, { useState, useEffect } from "react";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const submitHandler = async (e) => {
		console.log("New user created");
		const config = {
			headers: {
				"Content-type": "application/json",
			},
			baseURL: "http://localhost:6969",
		};
		e.preventDefault();
		const newUser = { name, email, password };
		await axios.post("/api/signup", newUser, config);
		setName("");
		setEmail("");
		setPassword("");
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
								className="form-control rounded-xl"
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
								className="form-control rounded-xl"
								placeholder="Username"
								required
							></input>
						</div>
						<div className="mb-4">
							<input
								name="password"
								type="password"
								className="form-control rounded-xl"
								placeholder="Password"
								required
							></input>
						</div>
						<label>Gender</label>
						<div className="flex mb-4">
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
							<button className="btn bg-[#45a29e] rounded-full size-full">
								Commit
							</button>
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
