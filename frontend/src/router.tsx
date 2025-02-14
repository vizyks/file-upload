import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/not-found";
import Home from "./pages/home/home";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";

function Router() {
  // take LogIn and Signup out of the App element and use App element for actual app elements like
  // file dashboard etc to create a seperation of wrappers and other things.

  const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LogIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
