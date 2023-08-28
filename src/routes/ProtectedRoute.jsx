import React from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const isUserLoggedIn = false;

	if (isUserLoggedIn) return children;
	else return <Navigate to="/auth" />;
};

export default ProtectedRoute;
