import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import ProtectedRoute from "./modules/auth/components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { logout } from "./redux/auth.redux";
import { ROUTES } from "./routes";
import { smeAxios } from "./services/sme.service";

import "./App.css";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    smeAxios.interceptors.response.clear();
    smeAxios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          dispatch(logout());
        }
      }
    );
  }, []);

  return (
    <div className="App">
      <ul>
        <li>
          <Link to={ROUTES.unprotected.LOGIN}>Login</Link>
        </li>
        <li>
          <Link to={ROUTES.protected.DASHBOARD}>Dashboard</Link>
        </li>
      </ul>
      <Routes>
        <Route path={ROUTES.unprotected.HOME} element={<Home />} />
        <Route path={ROUTES.unprotected.LOGIN} element={<Login />} />
        <Route
          path={`${ROUTES.protected.DASHBOARD}/:selectedTransactionId`}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.protected.DASHBOARD}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
