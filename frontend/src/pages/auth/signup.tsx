import { Link } from "react-router-dom";
import Input from "@/components/input";

function SignUp() {
  return (
    <>
      <main className="bg-black text-white w-screen h-screen flex justify-center items-center">
        <div className="flex flex-col grow gap-8 p-6 sm:w-full sm:max-w-md">
          <h1 className="text-3xl text-center">Sign up for an account.</h1>
          <form className="flex flex-col gap-4" action="">
            <Input name="Username" />
            <Input type="email" name="Email" />
            <Input type="password" name="Password" />
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
