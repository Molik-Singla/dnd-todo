import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
	// 🚀🚀 States -----------------------------------------------------------/////////////////////////////////////////////////////////////
	const navigate = useNavigate();
	const [profileOptionsBool, setProfileOptionsBool] = useState(false);

	const handleLogout = () => {
		Cookies.remove("token");
		navigate("/auth");
	};
	return (
		<header className="w-full h-14 bg-transparent flex justify-between items-center px-4">
			<section>
				<span className="font-black text-3xl text-black tracking-wider">Trello</span>
			</section>
			<section className="relative group">
				<button onClick={() => setProfileOptionsBool((prev) => !prev)} className="w-8 h-8">
					<img className="rounded-full" src="https://picsum.photos/200" alt="PROFILE_IMAGE" />
				</button>

				{profileOptionsBool && (
					<section
						onMouseLeave={() => setProfileOptionsBool(false)}
						className="w-40 h-auto p-3 px-4 bg-white bg-opacity-70 rounded-lg absolute right-0 font-primary"
					>
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
