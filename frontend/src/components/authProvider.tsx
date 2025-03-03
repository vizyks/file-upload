import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/lib/auth";
import Spinner from "@/components/spinner";

interface AuthContextType {
  user: { id: number; username: string } | undefined;
  setUser: (user: { id: number; username: string } | undefined) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<
    { id: number; username: string } | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);

  console.log("Auth Provider", user);

  useEffect(() => {
    getUser()
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  const value = {
    user,
    setUser,
  };

  return !isLoading ? (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) : (
    <Spinner />
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
