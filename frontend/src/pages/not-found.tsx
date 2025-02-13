import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="bg-black text-white text-center w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 p-6 sm:max-w-[650px] sm:w-full">
        <p className="text-grey-accent text-xl sm:text-2xl font-bold">404</p>
        <h1 className="font-bold text-4xl sm:text-5xl">Route Not Found</h1>
        <p className="text-grey-accent text-xl sm:text-2xl">
          This route seems to be unresolved. If something seems broken{" "}
          {/*Add a link to a contact page*/}
          <span className="underline">let us know</span>.
        </p>
        <Link
          to="/"
          className="text-purple-accent hover:text-purple-text-hover sm:text-lg"
        >
          Back to the home page.
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
