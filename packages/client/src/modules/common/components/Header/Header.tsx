import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { RootState } from "../../../../redux/store";
import { ROUTES } from "../../../../routes";
import LogoutButton from "../LogoutButton/LogoutButton";

const Header: React.FC = () => {
  const { user, loggedIn } = useSelector((state: RootState) => state.auth);
  const { data: sme, fetching: fetchingSme } = useSelector(
    (state: RootState) => state.sme
  );

  const { pathname } = useLocation();
  const link =
    pathname === ROUTES.unprotected.LOGIN ? (
      <Link to={ROUTES.unprotected.HOME}>HOME</Link>
    ) : (
      <Link to={ROUTES.unprotected.LOGIN}>Login</Link>
    );

  return (
    <div
      style={{
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: 0,
        left: 0,
        right: 0,
        padding: "10px 20px",
      }}
    >
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Link to={ROUTES.unprotected.HOME}>FinMid</Link>
        <div>{sme.legalName}</div>
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {loggedIn ? (
          <>
            <div>{user?.name}</div>
            <div>
              <LogoutButton />
            </div>
          </>
        ) : (
          link
        )}
      </div>
    </div>
  );
};

export default Header;
