import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import config from "../../../config";
import SubmitBtn from "../buttons/SubmitBtn";

const Landing = () => {
	const { setSharedValue } = useOutletContext();
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		const newUser = { email };
		setSharedValue(email);
		try {
			await config.post("/api/usr/email", newUser);
			setEmail("");
			navigate("/login");
		} catch (error) {
			setEmail("");
			navigate("/signup");
		}
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
							<SubmitBtn Placeholder="Proceed" />
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
