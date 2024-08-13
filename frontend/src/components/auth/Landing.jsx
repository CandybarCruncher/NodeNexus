import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import config from "../../../config";
import SubmitBtn from "../buttons/SubmitBtn";
import InputField from "../InputField";

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
			<div className="grid justify-items-center ">
				<img
					src="logo.png"
					className="h-30 w-25 mt-[-13%]"
				></img>
			</div>
			<form onSubmit={submitHandler}>
				<div className="m-8">
					<div className="mb-4">
						<InputField
							name="email"
							type="email"
							value={email}
							className="form-control rounded-xl"
							placeholder="email@domain.com"
							required
							onChange={(event) => setEmail(event.target.value)}
						/>
					</div>
					<div className="mb-4">
						<SubmitBtn Placeholder="Proceed" />
					</div>
					<div className="grid justify-items-center m-3 text-center">
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

export default Landing;
