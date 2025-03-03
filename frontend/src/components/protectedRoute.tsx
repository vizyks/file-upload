import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" replace={true}></Navigate>;
}

export default ProtectedRoute;
