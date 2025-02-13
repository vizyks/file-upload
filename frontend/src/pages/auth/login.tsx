import { Link } from "react-router-dom";

function LogIn() {
  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col grow gap-8 p-6 sm:w-full sm:max-w-md">
          <h1 className="text-3xl text-center">Login to your account.</h1>
          <form className="flex flex-col gap-4" action="">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                className="border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                type="text"
                name="username"
                id="username"
              />
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
                className="border-0 outline-0 bg-grey rounded-sm px-3 py-2 text-sm ring ring-grey-ring hover:ring-grey-ring-hover focus:ring-[3px] focus:ring-grey-ring-hover"
                type="password"
                name="password"
                id="password"
              />
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
    </>
  );
}

export default LogIn;
