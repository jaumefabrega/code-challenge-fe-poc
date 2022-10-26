import { useSelector } from "react-redux";

import { useAuth } from "../../../../hooks/useAuth";
import { RootState } from "../../../../redux/store";

const LogoutButton: React.FC = () => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  const { dispatchLogout } = useAuth();

  if (!loggedIn) return null;
  return <button onClick={dispatchLogout}>Logout</button>;
};

export default LogoutButton;
