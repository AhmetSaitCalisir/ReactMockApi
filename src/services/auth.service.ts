import axios from "axios";
import IAuthUser from "../models/AuthUser";

export const authService = { login, register, logout };

async function getUsers() {
  return axios
    .get(`${import.meta.env.VITE_MOCK_API_URL}/users`)
    .then((response) => response.data as IAuthUser[]);
}

async function login(user: IAuthUser) {
  const users = await getUsers();

  const match = users.find(
    (u) => u.password == user.password && u.username == user.username
  );

  if (match) {
    localStorage.setItem("X-Username", user.username);
    return match;
  }
  throw new Error("No_User");
}

async function register(user: IAuthUser) {
  return axios
    .post(`${import.meta.env.VITE_MOCK_API_URL}/users`, user)
    .then(() => {
      localStorage.setItem("X-Username", user.username);
      return user;
    });
}

async function logout() {
  localStorage.removeItem("X-Username");
}
