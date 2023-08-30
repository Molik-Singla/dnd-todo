import React from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const authToken = Cookies.get("token");

	if (authToken) return children;
	else return <Navigate to="/auth" />;
};

export default ProtectedRoute;
