import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

import { ROUTES } from "../../routes";

import styles from "./home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.background}>
      <ul className={styles.squares}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div className={styles.container}>
        <h1 className={styles.title}>finmid</h1>
        <h2 className={styles.subtitle}>Offer lending products today.</h2>
        <Button>
          <Link to={ROUTES.protected.DASHBOARD}>Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
