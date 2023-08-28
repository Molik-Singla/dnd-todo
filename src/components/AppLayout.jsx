import React from "react";
import Header from "./Header";

const AppLayout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default AppLayout;
