import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import LogoutButton from "../LogoutButton/LogoutButton";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { user, loggedIn } = useSelector((state: RootState) => state.auth);
  const { data: sme } = useSelector((state: RootState) => state.sme);

  return (
    <div className={styles.container}>
      <div>
        <Link to={ROUTES.unprotected.HOME}>
          <img className={styles.finmidLogo} src="/images/logo.svg" />
        </Link>
        <div className={styles.legalName}>{sme.legalName}</div>
      </div>
      <div>
        {loggedIn && (
          <>
            <div className={styles.userName}>{user?.name}</div>
            <div>
              <LogoutButton />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
