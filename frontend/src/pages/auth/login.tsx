import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import handleValidation from "@/utils/handleValidation";
import { logIn, AuthErrors } from "@/lib/auth";
import {
  nameSchema,
  passwordLoginSchema,
  userLogInSchema,
} from "@packages/schema";
import handleErrors from "@/utils/handleErrors";
import { useAuth } from "@/components/authProvider";

function LogIn() {
  const { user, setUser } = useAuth();
  // Use null to determine if page just loaded
  const [errors, setErrors] = useState<AuthErrors>({
    username: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleName = (username: string) => {
    handleValidation("username", username, nameSchema, setErrors);
  };

  const handlePassword = (password: string) => {
    handleValidation("password", password, passwordLoginSchema, setErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };

    const result = userLogInSchema.safeParse({
      username: target.username.value,
      password: target.password.value,
    });

    if (result.success) {
      logIn(target.username.value, target.password.value)
        .then((res) => {
          console.log("Logged in, redirecting to dashboard...");
          setUser(res);
          navigate("/dashboard", { replace: true });
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
      {user ? (
        <Navigate to="/dashboard" replace />
      ) : (
        <main className="bg-black text-white w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col grow gap-8 p-6 sm:w-full sm:max-w-md">
            <h1 className="text-3xl text-center">Login to your account.</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-2"
              action=""
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="username">Username</label>
                <input
                  className={`border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ${
                    errors["username"]
                      ? "ring-2 ring-[#7f1d1d]"
                      : "ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                  }`}
                  type="text"
                  name="username"
                  id="username"
                  onBlur={(e) => handleName(e.target.value)}
                />
                <p className="text-[#f36060] text-xs">{errors["username"]}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password">Password</label>
                  {/* Create forgot password link and page*/}

                  <Link
                    className="text-sm text-purple-accent hover:text-purple-text-hover"
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>

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
                value="Login"
              />
            </form>
            <p className="text-center text-sm text-grey-accent">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-purple-accent hover:text-purple-text-hover"
              >
                Sign up
              </Link>
            </p>
          </div>
        </main>
      )}
    </>
  );
}

export default LogIn;
