import { Link } from "react-router-dom";

import { ROUTES } from "../../routes";

const Home: React.FC = () => {
  return (
    <div>
      <h1>HOME</h1>
      <Link to={ROUTES.protected.DASHBOARD}>Dashboard</Link>
    </div>
  );
};

export default Home;
