import { Helmet } from "react-helmet-async";
import WelcomeSection from "../../components/WelcomeSection/WelcomeSection";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection";
import Loader from "../../components/Loader/Loader";

const Home = () => {
	return (
		<div>
			<Helmet>
				<title>Home</title>
			</Helmet>
			<WelcomeSection />
			<AdvantagesSection />
			<Loader />
		</div>
	);
};

export default Home;
