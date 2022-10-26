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
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: smeData, fetching: fetchingSme } = useSelector(
    (state: RootState) => state.sme
  );
  const { data: users, fetching: fetchingUsers } = useSelector(
    (state: RootState) => state.users
  );
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getSmeDatas = async () => {
      if (user) {
        if (!fetchingSme) dispatch(getSmeData()); // FIX: maybe add && !smeData
        if (!fetchingUsers) dispatch(getUsersData()); // FIX: maybe add && !usersData
      }
    };
    getSmeDatas();
  }, [user]);

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;
