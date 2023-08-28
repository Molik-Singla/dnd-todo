import React, { useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { toastSuccess } from "../helpers/ToastFunctions";

const AuthenticationPage = () => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const [isLoginBool, setIsLoginBool] = useState(true);
	const [inputValues, setInputValues] = useState({ myEmail: "", myPassword: "", myConfirmPassword: "" });

	const activeClasses = "bg-opacity-60";
	const inactiveClasses = "bg-opacity-20";
	const inputClasses =
		"rounded-md border w-full border-white/40 focus:bg-gray-50/50 bg-gray-50/30 p-2 px-4 placeholder:text-gray-600 placeholder:text-sm outline-none";

	const isButtonDisabled =
		inputValues.myEmail.length < 1 || inputValues.myPassword.length < 1 || (isLoginBool ? false : inputValues.myConfirmPassword.length < 1);

	// 🚀🚀 useEffects / Functions -------------------------------------------/////////////////////////////////////////////////////////////
	const handleOnChange = (evt) => {
		const { name, value } = evt.target;
		setInputValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		toastSuccess("Login Successful");
	};

	return (
		<section className="w-full h-full min-h-screen flex justify-center items-center font-primary">
			<section className="w-[96%] max-w-xs md:w-full md:max-w-sm bg-white bg-opacity-30 h-auto rounded-lg overflow-hidden pb-3 md:pb-5">
				<section className="flex items-center h-12 md:h-14">
					<button
						className={`w-1/2 flex justify-center items-center bg-white h-full text-gray-700 font-semibold tracking-wider ${
							isLoginBool ? activeClasses : inactiveClasses
						}`}
						onClick={() => setIsLoginBool(true)}
					>
						Login
					</button>
					<button
						className={`w-1/2 flex justify-center items-center bg-white h-full text-gray-700 font-semibold tracking-wider ${
							isLoginBool ? inactiveClasses : activeClasses
						}`}
						onClick={() => setIsLoginBool(false)}
					>
						Signup
					</button>
				</section>

				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					autoCapitalize="off"
					className="flex flex-col gap-4 md:gap-6 items-center py-6 px-4 md:px-6 mt-4"
				>
					<input
						className={inputClasses}
						type="email"
						placeholder="Enter your Email"
						name="myEmail"
						value={inputValues.myEmail}
						onChange={handleOnChange}
						onKeyDown={(evt) => evt.key === "Enter" && !isButtonDisabled && handleSubmit(evt)}
						autoComplete="off"
					/>
					<input
						className={inputClasses}
						type="password"
						placeholder="Enter your Password"
						name="myPassword"
						value={inputValues.myPassword}
						onChange={handleOnChange}
						onKeyDown={(evt) => evt.key === "Enter" && !isButtonDisabled && handleSubmit(evt)}
						autoComplete="new-password"
					/>
					{!isLoginBool && (
						<input
							className={inputClasses}
							type="password"
							placeholder="Enter Confirm Password"
							name="myConfirmPassword"
							value={inputValues.myConfirmPassword}
							onChange={handleOnChange}
							onKeyDown={(evt) => evt.key === "Enter" && !isButtonDisabled && handleSubmit(evt)}
							autoComplete="new-password"
						/>
					)}

					<button
						disabled={isButtonDisabled}
						className="w-full rounded-lg py-2 bg-green-500 text-white font-semibold mt-2 md:mt-4 disabled:bg-opacity-70 disabled:cursor-not-allowed"
					>
						{isLoginBool ? "Login" : "Signup"}
					</button>
				</form>
			</section>
		</section>
	);
};

export default AuthenticationPage;
