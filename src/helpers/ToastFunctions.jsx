import { toast } from "react-toastify";

export const toastSuccess = (message) => {
	toast.success(message, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	});
};
export const toastError = (message) => {
	toast.error(message, {
		position: "top-center",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		theme: "dark",
	});
};
