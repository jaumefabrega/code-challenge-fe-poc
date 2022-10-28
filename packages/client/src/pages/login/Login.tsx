import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { IconKey } from "@tabler/icons";

import { login } from "../../redux/auth.redux";
import { RootState } from "../../redux/store";
import { ROUTES } from "../../routes";
import { authService } from "../../services/auth.service";

import styles from "./login.module.scss";

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
  const [loggingIn, setLoggingIn] = useState(false);

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
    setLoggingIn(true);
    const { email, password } = formState;
    try {
      const token = await authService.login(email, password);
      dispatch(login(token));
    } catch (error) {
      alert(`${error}`);
      setFormState(initialFormState);
      if (emailFieldRef.current) emailFieldRef.current.focus();
    } finally {
      setLoggingIn(false);
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
    <section className={styles.container}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput
          type="email"
          placeholder="email"
          label="Email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          ref={emailFieldRef}
        />
        <PasswordInput
          placeholder="password"
          label="Password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          disabled={validateForm()}
          loading={loggingIn}
          leftIcon={<IconKey size={18} />}
          loaderProps={{ size: "xs" }}
          classNames={{ root: styles.button }}
        >
          Login
        </Button>
      </form>
    </section>
  );
};

export default Login;
