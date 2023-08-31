import React, { useState } from "react";

// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import Header from "./Header";
import ProfileModal from "./modals/ProfileModal";

const AppLayout = ({ children }) => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const [profileModalBool, setProfileModalBool] = useState(false);

	return (
		<>
			<Header handleOpenModal={() => setProfileModalBool(true)} />
			{children}
			{profileModalBool && <ProfileModal handleCloseModal={() => setProfileModalBool(false)} />}
		</>
	);
};

export default AppLayout;
