import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { getSmeData } from "../../../../redux/sme.redux";
import { AppDispatch, RootState } from "../../../../redux/store";

type Props = {
  children: JSX.Element;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: smeData, fetching: fetchingSme } = useSelector(
    (state: RootState) => state.sme
  );
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getSmeDatas = async () => {
      if (user && !fetchingSme) {
        // FIX: maybe add && !smeData
        dispatch(getSmeData());
      }
    };
    getSmeDatas();
  }, [user]);

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;
