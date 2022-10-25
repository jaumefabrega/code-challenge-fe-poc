import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { login } from "../../redux/auth.redux";
import { RootState } from "../../redux/store";
import { ROUTES } from "../../routes";
import { authService } from "../../services/auth.service";

type Form = {
  email: string;
  password: string;
};

const initialFormState = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const [formState, setFormState] = useState<Form>(initialFormState);
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  const emailFieldRef = useRef<HTMLInputElement>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formState;
    try {
      const token = await authService.login(email, password);
      dispatch(login(token));
    } catch (error) {
      alert(`${error}`);
      setFormState(initialFormState);
      if (emailFieldRef.current) emailFieldRef.current.focus();
    }
  };

  const validateForm = () => {
    return !formState.email || !formState.password;
  };

  if (loggedIn)
    return (
      <Navigate
        to={ROUTES.protected.DASHBOARD}
        state={{ from: location }}
        replace
      />
    );

  return (
    <section>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          autoComplete="off"
          ref={emailFieldRef}
          autoFocus
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <input type="submit" value="Login" disabled={validateForm()} />
      </form>
    </section>
  );
};

export default Login;
