export const logOut = (req, res) => {
  console.log("This is a logout route");
  res.send("This is a logout route.");
};

export const logIn = (req, res) => {
  const { username, password } = req.body;
  console.log(`LOGIN => Username: ${username}, Password ${password}`);
  res.redirect("/");
};

export const signUp = (req, res) => {
  const { username, password } = req.body;
  console.log(`SIGNUP => Username: ${username}, Password ${password}`);
  res.redirect("/");
};
