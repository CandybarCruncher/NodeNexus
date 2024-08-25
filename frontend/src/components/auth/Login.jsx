import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import config from "../../../config";
import SubmitBtn from "../buttons/SubmitBtn";
import InputField from "../InputField";
import { setUserData } from "../../../local";

const Login = () => {
	const { sharedValue } = useOutletContext();
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const navigate = useNavigate();

	const submitHandler = async (e) => {
		try {
			e.preventDefault();
			const email = sharedValue;
			const existingUser = { password, email };

			const userData = await config.post("/api/usr/login", existingUser);
			setUserData(userData);
			setPassword("");
			navigate("/home");
		} catch (error) {
			setErrorMessage(error.response?.data?.message || "An error occurred");
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
						<InputField
							name="password"
							type="password"
							value={password}
							className="form-control rounded-xl w-96"
							placeholder="Password"
							required
							onChange={(event) => setPassword(event.target.value)}
						/>
					</div>
					{errorMessage && (
						<div className="text-red-500">
							<p>{errorMessage}</p>
						</div>
					)}
					<div className="sm:flex">
						<div className="mt-2">
							<input
								type="checkbox"
								id="remember"
							></input>
							<label
								htmlFor="remember"
								className="ml-2 mr-40"
							>
								Remember me
							</label>
						</div>
						<div className="mt-2">
							<a href="">forgot your Password?</a>
						</div>
					</div>
					<div className="mt-4">
						<SubmitBtn Placeholder="Plug-in" />
					</div>
				</div>
			</form>
		</>
	);
};

export default Login;
