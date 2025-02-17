import api from "./api-client";

export type AuthErrors = {
  username: null | string;
  email?: null | string;
  password: null | string;
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
  console.log("submitted");
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
  console.log("logged in");
  return res;
};
