import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <div>
      <Helmet>
        <title>Page not found</title>
      </Helmet>
      <p>Sorry, the page you visited does not exist!</p>
      <button>
        <Link to="/">Back home</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;
