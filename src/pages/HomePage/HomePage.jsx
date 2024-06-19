import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <h1>Home</h1>
      <p>Content for home page</p>
    </div>
  );
};

export default Home;
