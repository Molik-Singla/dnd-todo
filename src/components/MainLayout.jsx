const MainLayout = ({ children }) => {
	return (
		<main className="bg-gradient-to-br from-purple-400 to-blue-300 h-full min-h-screen w-full font-primary">
			<section className="w-full h-full min-h-screen bg-white bg-opacity-20 flex justify-center">
				<section className="w-full h-full max-w-6xl">{children}</section>
			</section>
		</main>
	);
};

export default MainLayout;
