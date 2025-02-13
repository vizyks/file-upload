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

  const handleValidation = <T,>(
    value: T,
    schema: Zod.Schema<T>,
    setError: (error: string) => void,
    fieldName: string
  ) => {
    const result = schema.safeParse(value);

    if (result.success) {
      setError("");
      return true;
    } else {
      const error = result.error.format() as Record<
        string,
        { _errors?: string[] }
      >;

      if (error[fieldName]?._errors?.[0]) {
        setError(error[fieldName]._errors[0]);
        return false;
      }
    }
  };

  const handleUsername = (username: UserName) =>
    handleValidation(username, userNameSchema, setUserError, "username");

  const handleEmail = (email: Email) =>
    handleValidation(email, emailSchema, setEmailError, "email");

  const handlePassword = (password: Password) =>
    handleValidation(password, passwordSchema, setPasswordError, "password");

  const handleSubmit = (e) => {
    // Validate again to prevent submitting an empty form e.g form is empty load meaning there are "no" errors yet.
    const userName = handleValidation(
      { username: e.target.username.value },
      userNameSchema,
      setUserError,
      "username"
    );
    const email = handleValidation(
      { email: e.target.email.value },
      emailSchema,
      setEmailError,
      "email"
    );
    const password = handleValidation(
      { password: e.target.password.value },
      passwordSchema,
      setPasswordError,
      "password"
    );

    if (!userName || !email || !password) {
      console.log("Cant be empty and can't have errors");
    } else {
      console.log("success");
      // redirect to dashboard
    }

    // Prevent form submission
    e.preventDefault();
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
