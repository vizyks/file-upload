import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/home/home";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";

function Router() {
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
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
