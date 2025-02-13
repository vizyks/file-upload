import { Link } from "react-router-dom";
import { z } from "zod";
import { useState } from "react";

function SignUp() {
  const [userError, setUserError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const userNameSchema = z.object({
    username: z
      .string()
      .min(1, { message: "Can't be empty." })
      .max(10, { message: "Can't be 10 or more character long." }),
  });

  const emailSchema = z.object({
    email: z.string().min(1, { message: "Can't be empty." }).email(),
  });

  // Possibly make min a higher num
  const passwordSchema = z.object({
    password: z
      .string()
      .min(1, { message: "Can't be empty." })
      .regex(/[^a-zA-Z0-9\s]/, {
        message: "Must contain atleast one special character.",
      }),
  });

  type UserName = z.infer<typeof userNameSchema>;
  type Email = z.infer<typeof emailSchema>;
  type Password = z.infer<typeof passwordSchema>;

  // Refactor the error handling to seperate function
  // to reduce redundancy.

  const handleUsername = (username: UserName) => {
    const result = userNameSchema.safeParse(username);

    if (result.success) {
      setUserError("");
    } else {
      const error = result.error.format();

      if (error.username?._errors[0]) {
        setUserError(error.username._errors[0]);
      }
    }
  };

  const handleEmail = (email: Email) => {
    const result = emailSchema.safeParse(email);

    if (result.success) {
      setEmailError("");
    } else {
      const error = result.error.format();
      console.log(result.error);

      if (error.email?._errors[0]) {
        setEmailError(error.email._errors[0]);
      }
    }
  };

  const handlePassword = (password: Password) => {
    const result = passwordSchema.safeParse(password);

    if (result.success) {
      setPasswordError("");
    } else {
      const error = result.error.format();
      console.log(result.error);

      if (error.password?._errors[0]) {
        setPasswordError(error.password._errors[0]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: double check against a bigger "User" schema?
    // Logic to create User then redirect to login or dashboard
  };

  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col grow gap-8 p-6 sm:w-full sm:max-w-md">
          <h1 className="text-3xl text-center">Sign up for an account.</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
            action=""
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  userError
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="text"
                name="username"
                id="username"
                onBlur={(e) => handleUsername({ username: e.target.value })}
              />
              <p className="text-[#f36060] text-xs">{userError}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  emailError
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="email"
                name="email"
                id="email"
                onBlur={(e) => handleEmail({ email: e.target.value })}
              />
              <p className="text-[#f36060] text-xs">{emailError}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  passwordError
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="password"
                name="password"
                id="password"
                onBlur={(e) => handlePassword({ password: e.target.value })}
              />
              <p className="text-[#f36060] text-xs">{passwordError}</p>
            </div>
            <input
              className="bg-purple py-3 px-8 mt-2 text-sm rounded-sm font-bold transition duration-150 ease-in-out hover:bg-purple-btn-hover hover:cursor-pointer"
              type="submit"
              value="Sign up"
            />
          </form>
          <p className="text-center text-sm text-grey-accent">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-accent hover:text-purple-text-hover"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default SignUp;
