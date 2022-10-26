import { useDispatch } from "react-redux";
import { logoutPartial } from "../redux/auth.redux";
import { clearSme } from "../redux/sme.redux";
import { AppDispatch } from "../redux/store";
import { clearUsers } from "../redux/users.redux";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const dispatchLogout = () => {
    dispatch(logoutPartial());
    dispatch(clearSme());
    dispatch(clearUsers());
  };

  return { dispatchLogout };
};
