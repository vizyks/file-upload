import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import handleValidation from "@/utils/handleValidation";
import { signUp, AuthErrors } from "@/lib/auth";
import {
  nameSchema,
  emailSchema,
  passwordSignupSchema,
  userSignUpSchema,
} from "@packages/schema";
import handleErrors from "@/utils/handleErrors";

function SignUp() {
  const [errors, setErrors] = useState<AuthErrors>({
    username: null,
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  // Handle validation/errors on per input basis
  const handleName = (username: string) =>
    handleValidation("username", username, nameSchema, setErrors);

  const handleEmail = (email: string) =>
    handleValidation("email", email, emailSchema, setErrors);

  const handlePassword = (password: string) =>
    handleValidation("password", password, passwordSignupSchema, setErrors);

  // Handle validation/errors on whole form and backend response
  const handleSubmit = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const result = userSignUpSchema.safeParse({
      username: target.username.value,
      email: target.email.value,
      password: target.password.value,
    });

    if (result.success) {
      // Upon account creation success make a better visual indicator of success
      // Then have the user navigate (or do it for them) to login to log into their new account.
      signUp(target.username.value, target.email.value, target.password.value)
        .then((res) => {
          console.log(res);
          console.log("Submitted, redirecting to dashboard...");
          navigate("/login");
        })
        .catch((err) => handleErrors(err.response.data, setErrors));
    } else {
      const error = result.error.flatten();
      handleErrors(error.fieldErrors, setErrors);
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
                  errors[`username`]
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="text"
                name="username"
                id="username"
                onBlur={(e) => handleName(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{errors[`username`]}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  errors["email"]
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="email"
                name="email"
                id="email"
                onBlur={(e) => handleEmail(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{errors["email"]}</p>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                  errors["password"]
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="password"
                name="password"
                id="password"
                onBlur={(e) => handlePassword(e.target.value)}
              />
              <p className="text-[#f36060] text-xs">{errors["password"]}</p>
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
