import api from "./api-client";

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
