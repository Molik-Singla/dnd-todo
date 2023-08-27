/* eslint-disable no-unused-vars */
import React from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";

const App = () => {
	return (
		<MainLayout>
			<Header />
			<HomePage />
		</MainLayout>
	);
};

export default App;
