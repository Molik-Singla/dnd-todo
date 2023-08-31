import React, { useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess } from "../helpers/ToastFunctions";
import { apiLogin, apiSignup, selectUserState } from "../features/userSlice";
import LoaderModal from "../components/modals/LoaderModal";

const AuthenticationPage = () => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector(selectUserState);

	const [isLoginBool, setIsLoginBool] = useState(true);
	const [inputValues, setInputValues] = useState({ myEmail: "", myPassword: "", myName: "" });

	const activeClasses = "bg-opacity-60";
	const inactiveClasses = "bg-opacity-20";
	const inputClasses =
		"rounded-md border w-full border-white/40 focus:bg-gray-50/50 bg-gray-50/30 p-2 px-4 placeholder:text-gray-600 placeholder:text-sm outline-none";

	const isButtonDisabled = inputValues.myEmail.length < 1 || inputValues.myPassword.length < 1 || (isLoginBool ? false : inputValues.myName.length < 1);

	// 🚀🚀 useEffects / Functions -------------------------------------------/////////////////////////////////////////////////////////////
	const handleOnChange = (evt) => {
		const { name, value } = evt.target;
		setInputValues((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		let response = null;
		try {
			if (!isLoginBool) {
				response = await dispatch(
					apiSignup({
						name: inputValues.myName,
						email: inputValues.myEmail,
						password: inputValues.myPassword,
					})
				).unwrap();
				toastSuccess("Signup Successful");
			} else {
				response = await dispatch(
					apiLogin({
						email: inputValues.myEmail,
						password: inputValues.myPassword,
					})
				).unwrap();
				toastSuccess("Login Successful");
			}
			let inNintyDay = new Date(new Date().getTime() + 60 * 60 * 24 * 90 * 1000);
			Cookies.set("token", response.token, { expires: inNintyDay });
			navigate("/");
		} catch (err) {
			toastError(err?.message || "Something went wrong");
		} finally {
			setInputValues({ myEmail: "", myPassword: "", myName: "" });
		}
	};

	return (
		<>
			{userState.loading && <LoaderModal />}
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
						{!isLoginBool && (
							<input
								className={inputClasses}
								type="text"
								placeholder="Enter your Name"
								name="myName"
								value={inputValues.myName}
								onChange={handleOnChange}
								onKeyDown={(evt) => evt.key === "Enter" && !isButtonDisabled && handleSubmit(evt)}
								autoComplete="new-password"
							/>
						)}
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

						<button
							disabled={isButtonDisabled}
							className="w-full rounded-lg h-10 bg-green-500 text-white font-semibold mt-2 md:mt-4 disabled:bg-opacity-70 disabled:cursor-not-allowed"
						>
							<span>{isLoginBool ? "Login" : "Signup"}</span>
						</button>
					</form>
				</section>
			</section>
		</>
	);
};

export default AuthenticationPage;
