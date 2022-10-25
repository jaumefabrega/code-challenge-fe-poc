import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function login(email: string, password: string): Promise<string> {
  return authAxios
    .post(`/login`, { email, password })
    .then((res) => res.data.token);
}

export const authService = {
  login,
};
