import api from "./api-client";

export type AuthErrors = {
  username: null | string | string[];
  email?: null | string | string[];
  password: null | string | string[];
};

export const getUser = async () => {
  const res = await api.get("/users/auth/me");

  return res;
};

export const logOut = async () => {
  const res = await api.get("/users/logout");
  return res;
};

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await api.post(
    "/users/signup",
    {
      username: username,
      email: email,
      password: password,
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return res;
};

export const logIn = async (username: string, password: string) => {
  const res = await api.post(
    "/users/login",
    {
      username: username,
      password: password,
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  return res;
};
