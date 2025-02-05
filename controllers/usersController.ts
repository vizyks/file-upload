export const logout = (req, res) => {
  console.log("This is a logout route");
  res.send("This is a logout route.");
};

export const login = (req, res) => {
  const { username, password } = req.body;
  console.log(`LOGIN => Username: ${username}, Password ${password}`);
  res.redirect("/");
};

export const signup = (req, res) => {
  const { username, password } = req.body;
  console.log(`SIGNUP => Username: ${username}, Password ${password}`);
  res.redirect("/");
};
