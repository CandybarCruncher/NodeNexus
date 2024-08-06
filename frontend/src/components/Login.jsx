import { useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import config from "../../config";

const Login = () => {
	const { sharedValue } = useOutletContext();
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		const email = sharedValue;
		const existingUser = { password, email };
		// console.log(existingUser);

		await config.post("/api/usr/login", existingUser);
		setPassword("");
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
						<div
							className="mb-4 text-center drop-shadow-xl text-xl"
							style={{ textShadow: "0 0 5px black" }}
						>
							{sharedValue.localeCompare("") ? (
								<div>
									<p>{sharedValue}</p>
								</div>
							) : (
								<a
									href="/"
									className=" text-red-500 hover:text-red-400"
								>
									{"enter your email here"}
								</a>
							)}
						</div>
						<div className="mt-8">
							<input
								name="password"
								type="password"
								value={password}
								className="form-control rounded-xl w-96"
								placeholder="Password"
								required
								onChange={(event) => setPassword(event.target.value)}
							></input>
						</div>
						<div className="">
							<div className="mt-2">
								<input
									type="checkbox"
									id="remember"
								></input>
								<label
									htmlFor="remember"
									className="ml-2"
								>
									Remember me
								</label>
							</div>
							<div>
								<a href="">forgot your Password?</a>
							</div>
						</div>
						<div className="mt-4">
							<button className="btn bg-[#45a29e] rounded-full size-full">
								Plug-in
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default Login;
