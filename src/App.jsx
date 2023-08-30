/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import Cookies from "js-cookie";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";

const App = () => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const navigate = useNavigate();

	// 🚀🚀 useEffects / Functions -------------------------------------------/////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Cookies.get("token")) navigate("/");
		else navigate("/auth");
	}, [navigate]);

	return (
		<MainLayout>
			<Routes>
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<AppLayout>
								<HomePage />
							</AppLayout>
						</ProtectedRoute>
					}
				/>
				<Route path="/auth" element={<AuthenticationPage />} />
			</Routes>
		</MainLayout>
	);
};

export default App;
