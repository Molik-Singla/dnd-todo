import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./css/output.css";
// import "./css/input.css";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import store from "./store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
		<ToastContainer />
	</BrowserRouter>
);
