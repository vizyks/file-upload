import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Main from "./pages/dashboard/main";
import Contact from "./pages/dashboard/contact";
import NotFound from "./pages/not-found";
import LandingPage from "./pages/landing-page";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import ProtectedRoute from "./components/protectedRoute";
import AuthProvider from "./components/authProvider";

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
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Main />,
        },
        {
          path: "/dashboard/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default Router;
