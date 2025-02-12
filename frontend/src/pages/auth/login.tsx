import { Link } from "react-router-dom";
import Input from "@/components/input";

function LogIn() {
  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col grow gap-8 p-6 sm:w-full sm:max-w-md">
          <h1 className="text-3xl text-center">Login to your account.</h1>
          <form className="flex flex-col gap-4" action="">
            <Input name="Username" />
            <Input type="password" name="Password" recovery={true} />
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
