import Cookies from "js-cookie";
import React from "react";
import ReactDOM from "react-dom";

// 🚀🚀 Icons / CSS ------------------------------------------------------/////////////////////////////////////////////////////////////////
import { RxCross1 } from "react-icons/rx";
import { toastError } from "../../helpers/ToastFunctions";

const ProfileModal = ({ handleCloseModal }) => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const user = JSON.parse(Cookies.get("user") || "{}");

	if (!user) {
		toastError("Please login to continue");
		handleCloseModal();
		return;
	}

	return ReactDOM.createPortal(
		<section className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center font-primary">
			<section className="bg-white min-w-[280px] bg-opacity-70 w-auto h-auto rounded-xl shadow-[4px_4px_18px_-4px_#ffffff61] overflow-hidden">
				<section className="flex justify-between bg-white w-full p-3 px-4 bg-opacity-40">
					<p className="font-semibold text-xl">Profile</p>
					<button onClick={handleCloseModal} className="w-7 h-7 flex justify-center items-center bg-red-600 rounded-full text-white">
						<RxCross1 />
					</button>
				</section>
				<section className="p-3 px-4 flex flex-col gap-2 mt-4 mb-3">
					<p className="font-semibold">{user && user?.name}</p>
					<p className="text-sm">{user && user?.email}</p>
				</section>
			</section>
		</section>,
		document.getElementById("modal")
	);
};

export default ProfileModal;
