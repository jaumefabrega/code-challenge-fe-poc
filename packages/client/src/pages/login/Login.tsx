import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Button, Modal, PasswordInput, TextInput } from "@mantine/core";
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
  const dispatch = useDispatch();
  const location = useLocation();
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const emailFieldRef = useRef<HTMLInputElement>(null);

  const [formState, setFormState] = useState<Form>(initialFormState);
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      setError(true);
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
    <>
      <section className={styles.container}>
        <h3>Login</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextInput
            type="email"
            placeholder="email"
            label="Email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            ref={emailFieldRef}
          />
          <PasswordInput
            placeholder="password"
            label="Password"
            name="password"
            value={formState.password}
            onChange={handleInputChange}
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
      <Modal
        opened={error}
        onClose={() => setError(false)}
        title="Oopsie"
        centered
      >
        <div>Try again</div>
      </Modal>
    </>
  );
};

export default Login;
