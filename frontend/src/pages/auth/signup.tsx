import { Link } from "react-router-dom";
import { useState } from "react";
import handleValidation from "@/features/auth/handleValidation";
import {
  nameSchema,
  Name,
  emailSchema,
  Email,
  passwordSignupSchema,
  PasswordSignup,
} from "@/lib/auth";

function SignUp() {
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleName = (username: Name) =>
    handleValidation(username, nameSchema, setNameError, "username");

  const handleEmail = (email: Email) =>
    handleValidation(email, emailSchema, setEmailError, "email");

  const handlePassword = (password: PasswordSignup) =>
    handleValidation(
      password,
      passwordSignupSchema,
      setPasswordError,
      "password"
    );

  const handleSubmit = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };

    if (
      nameError ||
      nameError === null ||
      passwordError ||
      passwordError === null ||
      emailError ||
      emailError === null
    ) {
      handleName({ username: target.username.value } as Name);
      handleEmail({ email: target.email.value } as Email);
      handlePassword({ password: target.password.value } as PasswordSignup);
      console.log("Fix errors before submitting");
    } else {
      // Submit form to backend, check for backend validation errors then redirect to dashboard.
      console.log("submitted");
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
                  nameError
                    ? "ring-2 ring-[#7f1d1d]"
                    : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                }`}
                type="text"
                name="username"
                id="username"
                onBlur={(e) => handleName({ username: e.target.value })}
              />
              <p className="text-[#f36060] text-xs">{nameError}</p>
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
