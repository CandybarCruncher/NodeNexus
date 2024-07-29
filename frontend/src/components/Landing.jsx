import React, { useEffect, useState } from "react";
import "../CSS/landingPage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Landing = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		const config = {
			headers: {
				"Content-type": "application/json",
			},
			baseURL: "http://localhost:6969",
		};
		e.preventDefault();
		const newUser = { email };
		const response = await axios.post("/api/signup", newUser, config);
		setEmail("");
		navigate("/login");
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
								type="email"
								value={email}
								className="form-control rounded-xl"
								placeholder="email@domain.com"
								required
								onChange={(event) => setEmail(event.target.value)}
							></input>
						</div>
						<div className="mb-4">
							<button className="btn bg-[#45a29e] rounded-full size-full">
								Proceed
							</button>
						</div>
						<div className="grid justify-items-center m-3 text-center">
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

export default Landing;
