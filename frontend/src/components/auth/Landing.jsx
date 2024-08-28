import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import config from "../../../config";
import SubmitBtn from "../buttons/SubmitBtn";
import InputField from "../InputField";
import { validate } from "../../../validatePattern";

const Landing = () => {
	const { setSharedValue } = useOutletContext();
	const [formData, setFormData] = useState({
		email: "",
	});
	const [errors, setErrors] = useState({});

	const navigate = useNavigate();
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	const submitHandler = async (e) => {
		e.preventDefault();
		const requiredFields = ["email"];
		const validationErrors = validate(formData, requiredFields);

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}
		setSharedValue(formData.email);
		try {
			await config.post("/api/usr/email", formData);
			setFormData({ email: "" });
			navigate("/login");
		} catch (error) {
			setFormData({ email: "" });
			navigate("/signup");
		}
	};

	return (
		<>
			<div className="grid justify-items-center ">
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
							type="email"
							value={formData.email}
							error={Boolean(errors.email)}
							helperText={errors.email}
							placeholder="email@domain.com"
							onChange={handleChange}
							required
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
