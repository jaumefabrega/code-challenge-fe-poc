import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { getSmeData } from "../../../../redux/sme.redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getUsersData } from "../../../../redux/users.redux";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const { fetched: fetchedSme, fetching: fetchingSme } = useSelector(
    (state: RootState) => state.sme
  );
  const { fetched: fetchedUsers, fetching: fetchingUsers } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    const getProtectedData = async () => {
      if (user) {
        if (!fetchedSme && !fetchingSme) dispatch(getSmeData());
        if (!fetchedUsers && !fetchingUsers) dispatch(getUsersData());
      }
    };
    getProtectedData();
  }, [user]);

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default ProtectedRoute;
