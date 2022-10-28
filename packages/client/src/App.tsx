import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useAuth } from "./hooks/useAuth";
import Header from "./modules/common/components/Header/Header";
import ProtectedRoute from "./modules/common/components/ProtectedRoute/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { ROUTES } from "./routes";
import { smeAxios } from "./services/sme.service";

import "./App.css";
import styles from "./app.module.scss";

function App() {
  const { dispatchLogout } = useAuth();

  useEffect(() => {
    smeAxios.interceptors.response.clear();
    smeAxios.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response.status === 401) {
          dispatchLogout();
        }
      }
    );
  }, []);

  return (
    <div className="App">
      <Header />
      <div className={styles.content}>
        <Routes>
          <Route path={ROUTES.unprotected.HOME} element={<Home />} />
          <Route path={ROUTES.unprotected.LOGIN} element={<Login />} />
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
    </div>
  );
}

export default App;
