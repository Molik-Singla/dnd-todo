import React from "react";
import ReactDOM from "react-dom";
import Loader from "../Loader";

const LoaderModal = () => {
	return ReactDOM.createPortal(
		<section className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center font-primary">
			<section className="bg-white bg-opacity-30 w-20 h-20 rounded-xl shadow-[4px_4px_18px_-4px_#ffffff61] p-4">
				<Loader />
			</section>
		</section>,
		document.getElementById("modal")
	);
};

export default LoaderModal;
