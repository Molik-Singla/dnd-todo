// 🚀🚀 Components / Hooks -----------------------------------------------/////////////////////////////////////////////////////////////////
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import profile_img from "./../assets/Images/profile.jfif";

const Header = ({ handleOpenModal }) => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const user = JSON.parse(Cookies.get("user") || "{}");
	const navigate = useNavigate();
	const [profileOptionsBool, setProfileOptionsBool] = useState(false);

	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/auth");
	};
	return (
		<header className="w-full h-14 bg-transparent flex justify-between items-center px-4">
			<section>
				<span className="font-black text-2xl md:text-3xl font-secondary text-white tracking-widest">Task Tide</span>
			</section>
			<section className="relative">
				<section className="flex gap-4 items-center">
					<p className="font-semibold">{user && user?.name}</p>
					<button onClick={() => setProfileOptionsBool((prev) => !prev)} className="w-9 h-9">
						<img className="rounded-full w-full h-full" src={profile_img} alt="PROFILE_IMAGE" />
					</button>
				</section>

				{profileOptionsBool && (
					<section
						onMouseLeave={() => setProfileOptionsBool(false)}
						className="w-40 h-auto p-3 px-4 bg-white bg-opacity-80 mt-2 rounded-lg absolute right-0 font-primary flex flex-col gap-2"
					>
						<button onClick={handleOpenModal} className="font-medium w-full text-start hover:font-semibold">
							Profile
						</button>
						<button onClick={handleLogout} className="text-red-600 font-medium w-full text-start hover:font-semibold">
							Logout
						</button>
					</section>
				)}
			</section>
		</header>
	);
};

export default Header;
