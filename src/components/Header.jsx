const Header = () => {
	return (
		<header className="w-full h-14 bg-transparent flex justify-between items-center px-4">
			<section>
				<span className="font-black text-2xl">Trello</span>
			</section>
			<section>
				<div className="w-8 h-8">
					<img className="rounded-full" src="https://picsum.photos/200" alt="PROFILE_IMAGE" />
				</div>
			</section>
		</header>
	);
};

export default Header;
