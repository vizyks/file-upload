import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import NotFound from "./pages/not-found";
import LandingPage from "./pages/landing-page";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";

function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <App />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
