import React from "react";

const Login = () => {
	return (
		<>
			<div className="border-solid border-2 rounded-3xl">
				<form
					action="login"
					method="POST"
				>
					<div className="grid justify-items-center">
						<img
							src="logo.png"
							className="h-30 w-25"
						></img>
					</div>
					<div className="m-8">
						<div className="mt-8">
							<input
								name="username"
								type="text"
								className="form-control rounded-xl w-96"
								placeholder="Password"
								required
							></input>
						</div>
						<div className="">
							<div className="mt-2">
								<input
									type="checkbox"
									id="remember"
								></input>
								<label
									for="remember"
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
