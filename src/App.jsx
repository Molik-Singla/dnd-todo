/* eslint-disable no-unused-vars */
import React from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AppLayout from "./components/AppLayout";

const App = () => {
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
