import { useSelector } from "react-redux";
import { Button } from "@mantine/core";

import { useAuth } from "../../../../hooks/useAuth";
import { RootState } from "../../../../redux/store";

const LogoutButton: React.FC = () => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  const { dispatchLogout } = useAuth();

  if (!loggedIn) return null;
  return (
    <Button onClick={dispatchLogout} size="sm" variant="light" radius="lg">
      Logout
    </Button>
  );
};

export default LogoutButton;
