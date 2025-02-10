function Home() {
  return (
    <>
      <main className="bg-black text-white text-center w-screen h-screen flex justify-center">
        <div className="flex flex-col justify-center items-center w-2xl gap-4">
          <h1 className="text-6xl/tight font-bold ">
            Warp Files —<span className="text-purple-accent"> Infinite</span>
            <br />
            Possibilities
          </h1>
          <p className="mb-4">
            Upload, organize and share files using a persistant 24/7 hosting
            service. Easy to use, secure fast downloads and uploads.
          </p>
          <div className="grid gap-4">
            <button className="bg-purple py-4 px-16 rounded-sm text-xs font-bold transition duration-150 ease-in-out hover:bg-purple-hover hover:cursor-pointer">
              GET STARTED
            </button>
            <button className="text-grey-text text-xs transition duration-150 ease-in-out hover:text-purple-accent hover:cursor-pointer">
              Sign In
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
